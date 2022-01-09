# Food Delivery App

## Problem Statement: 
It is known fact that in today’s work-from-home world, people prefer ordering food that can be delivered at the comfort of their home. So most of the times people end up ordering food from restaurants that have delivery services. The objective of this problem statement is to come up with a solution for people to order food online and get prompt delivery. You need to solve the given problem by developing a web application, that should facilitate users to order food online from different restaurants using the web-app to cater their needs.

## Primary Features

- Register and login
- Fetch single food item 
- Fetch multiple food items 
- Post food item 
- Fetch single user
- Fetch multiple users
- Update user
- Delete user

## Additional Features

- Authenticate all the private routes through JWT
- Get all the reviews for a particular food item
- Post a review for a food item
- Add item to cart
- Delete item from cart
- Get cart details for a particular user
- Place an order
- Check user order history
- Apply coupon code to get discount


## API Description

Register: 
{
  endpoint: /api/register
  method: POST
} 

Example

```JSON
{
      "firstname":"user",
      "lastname":"one",
      "email":"userone@gmail.com",
      "password":"userone",
      "username":"user1",
      "housenumber":453,
      "street":"Talpuri",
      "city":"Bhilai",
      "state":"CG",
      "zip":490006
}

```

Login: 
{
  endpoint: /api/authenticate
  method: POST
} 

Example

```JSON
{
      "username":"user1",
      "password":"userone"
}

```

Get All Users: 
{
  endpoint: /api/users
  method: GET
  headers: {
    x-access-token: <token>
  }
} 



Get Single User: 
{
  endpoint: /api/users/<userid>
  method: GET
  headers: {
    x-access-token: <token>
  }
} 


Update User: 
{
  endpoint: /api/users/<userid>
  method: PUT
  headers: {
    x-access-token: <token>
  }
} 

Input all the feilds that need to be updated
Example

```JSON
{
      "firstname": "Swastik",
      "email":"useronee@gmail.com",
}

```
  
Delete User: 
{
  endpoint: /api/users/<userid>
  method: DELETE
  headers: {
    x-access-token: <token>
  }
} 

  
Get ALL Food Item: 
{
  endpoint: /api/food/
  method: GET
  headers: {
    x-access-token: <token>
  }
} 
  
  
Get Single Food Item: 
{
  endpoint: /api/food/<foodid>
  method: GET
  headers: {
    x-access-token: <token>
  }
} 
  

Post Food Item: 
{
  endpoint: /api/food/
  method: POSTT
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{ 
    "foodId" : 11, 
    "foodName" : "french fries2", 
    "foodCost" : 180, 
    "foodType" : "snack"
}

```
  
Get User's Cart Details: 
{
  endpoint: /api/cart/
  method: GET
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{
      "userId": 1
}

```  

Add Item to Cart: 
{
  endpoint: /api/cart/
  method: POST
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{
      "userId": 1,
      "foodId": 1
}

```  
  
Delete Item from Cart: 
{
  endpoint: /api/cart/
  method: DELETE
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{
      "userId": 1,
      "foodId": 1
}

```  
  
  
Get User's Order History: 
{
  endpoint: /api/orders
  method: GET
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{
      "userId": 1,
}

```  
  
Place Order: 
{
  endpoint: /api/orders
  method: POST
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{
      "userId": 1,
      "coupon": "FLAT50"
}

  
Get Review for a food item: 
{
  endpoint: /api/reviews
  method: GET
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{
      "foodId": 1
}
```  
  
Post Review for a food item: 
{
  endpoint: /api/reviews
  method: POST
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{
      "foodId": 1,
      "userId": 1,
      "description": "Delicious..."
      "rating": 4
}
```  

Post Review for a food item: 
{
  endpoint: /api/reviews
  method: GET
  headers: {
    x-access-token: <token>
  }
} 

Example

```JSON
{
      "foodId": 1,
      "userId": 1,
      "description": "Delicious..."
      "rating": 4
}
```  
