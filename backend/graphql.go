package graphql

import (
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

// Define your GraphQL schema here
var schema graphql.Schema

func GraphqlHandler(w http.ResponseWriter, r *http.Request) {
	// create a new GraphQL HTTP handler with our schema
	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})

	// serve a GraphQL API endpoint at `/graphql`
	h.ServeHTTP(w, r)
}
