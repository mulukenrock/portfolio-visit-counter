const apollo_client = require("../apollo/portfolio-visit-counter");
const gql = require("apollo-boost").gql;
const getNestedSafe = require("./nested-safe");

module.exports = async (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const { page } = req.body.input;

  const insert_count = gql`
    mutation ($obj: visit_counts_insert_input!) {
      insert_visit_count(object: $obj) {
        total
      }
    }
  `;
  const update_count = gql`
    mutation ($from: String!, $page: String!) {
      update_visit_counts(
        where: { from: { _eq: $from }, page: { _eq: $page } }
        _inc: { total: 1 }
      ) {
        returning {
          total
        }
      }
    }
  `;

  try {
    let inserted = await apollo_client.mutate({
      mutation: insert_count,
      variables: {
        obj: {
          from: ip,
          page,
          total: 1,
        },
      },
    });

    if (getNestedSafe(() => inserted.data.insert_visit_count.total))
      res.status(200).json({
        total: inserted.data.insert_visit_count.total,
      });
    else
      res.status(400).json({
        message: "Oops, something went wrong in data insert!",
      });
  } catch (error) {
    const { graphQLErrors } = error;
    console.log(error, " the errrrrrrr");
    let message = getNestedSafe(() => graphQLErrors[0].message);
    if (message.includes("visit_counts_from_page_key")) {
      let updated = await apollo_client.mutate({
        mutation: update_count,
        variables: {
          from: ip,
          page,
        },
      });

      if (
        getNestedSafe(() => updated.data.update_visit_counts.returning[0].total)
      )
        return res.status(200).json({
          total: updated.data.update_visit_counts.returning[0].total,
        });
      else
        return res.status(400).json({
          message: "Oops, something went wrong in data update!",
        });
    } else if (message)
      return res.status(422).json({
        message,
      });

    res.status(400).json({
      message: "unknown_error",
    });
  }
};
