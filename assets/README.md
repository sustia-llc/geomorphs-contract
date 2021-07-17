## Arweave Notes

### GraphQL Query by Owner's Arweave Address
https://arweave.net/graphql

```
query {
    transactions(owners:["aikTf7F3DZ6QbWjuxTbtHsdkL_rpBFrMNnmJERZ8Tnc"]) {
        edges {
            node {
                id
              	block {
                  timestamp
                }
            }
        }
    }
}
```
