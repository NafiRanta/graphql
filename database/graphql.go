package graphql

import (
	"encoding/base64"
	"encoding/json"
	u "graphql/utils"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

// Define your GraphQL schema here
var userType = graphql.NewObject(graphql.ObjectConfig{
	Name:        "User",
	Description: "A user",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
		},
		"username": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"password": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"email": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})

// Define a query for the 'User' object to authenticate using jwt
var queryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"authenticate": &graphql.Field{
			Type: userType,
			Args: graphql.FieldConfigArgument{
				"username": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"password": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			/* Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				_, err := Authenticate(params.Args["username"].(string), params.Args["password"].(string))
				if err != nil {
					return nil, err
				}
				return userType, nil
			}, */
		},
	},
})

// Define the GraphQL schema
var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query: queryType,
})

func GraphqlHandler(w http.ResponseWriter, r *http.Request) {
	// create a new GraphQL HTTP handler with our schema
	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	// serve a GraphQL API endpoint at `/graphql`
	h.ServeHTTP(w, r)
}

func SignInHandler(w http.ResponseWriter, r *http.Request) {
	var userLoginRequest u.User
	if err := json.NewDecoder(r.Body).Decode(&userLoginRequest); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	claims := u.Claims{
		Username: userLoginRequest.Username, // TODO: Replace with the user's ID
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // Expire after 24 hours
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with a secret key
	// NOTE: This key should be kept secret and not hard-coded in your code
	// You could store it in an environment variable or a separate config file
	key := []byte("secret-key")
	signedToken, err := token.SignedString(key)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Encode the JWT as a base64-encoded string for easy storage and transmission
	encodedToken := base64.StdEncoding.EncodeToString([]byte(signedToken))

	// Send the encoded JWT in the response body
	response := struct {
		Token string `json:"token"`
	}{Token: encodedToken}
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

}

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
