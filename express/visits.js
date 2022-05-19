const apollo_client = require("../apollo/portfolio-visit-counter");
const gql = require("apollo-boost").gql;
const getNestedSafe = require("./nested-safe");

module.exports = async (req, res) => {
  const get_visits = gql`
    query {
      visit_counts_aggregate {
        aggregate {
          sum {
            total
          }
        }
      }
    }
  `;

  try {
    let { data } = await apollo_client.query({
      query: get_visits,
      variables: {},
      fetchPolicy: "network-only",
    });

    if (getNestedSafe(() => data.visit_counts_aggregate.aggregate.sum.total))
      res.status(200).json({
        total: data.visit_counts_aggregate.aggregate.sum.total,
      });
    else
      res.status(400).json({
        message: "Oops, something went wrong!",
      });
  } catch (error) {
    const { graphQLErrors } = error;
    console.log(error, " the errrrrrrr");
    let message = getNestedSafe(() => graphQLErrors[0].message);
    if (message)
      return res.status(422).json({
        message,
      });

    res.status(400).json({
      message: "unknown_error",
    });
  }
};
