package graphql

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		tokenString := authHeader[len("Bearer "):]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Provide your own secret key here
			return []byte("secret"), nil
		})
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		if !token.Valid {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// The JWT token is valid, so we can proceed with the next handler
		next.ServeHTTP(w, r)
	})
}

func SignInHandler(w http.ResponseWriter, r *http.Request) {
	// username := r.FormValue("username")
	// password := r.FormValue("password")
	// credentials := username + ":" + password
	// encodedCredentials := base64.StdEncoding.EncodeToString([]byte(credentials))
	// req, err := http.NewRequest("POST", "/api/auth/signin", nil)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// req.Header.Set("Authorization", "Basic "+encodedCredentials)
	// client := &http.Client{}
	// resp, err := client.Do(req)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// defer resp.Body.Close()
	// Define a type for the 'User' object
	var userType = graphql.NewObject(graphql.ObjectConfig{
		Name: "User",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
			},
			"login": &graphql.Field{
				Type: graphql.String,
			},
		},
	})

	// Define a query for the 'User' object
	var queryType = graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"user": &graphql.Field{
				Type: userType,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.ID,
					},
				},
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					// Fetch user data from database or API
					return userType, nil
				},
			},
		},
	})

	// Define the GraphQL schema
	var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
		Query: queryType,
	})

	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	// serve a GraphQL API endpoint at `/graphql`
	h.ServeHTTP(w, r)
	// parse response body and extract JWT
}
