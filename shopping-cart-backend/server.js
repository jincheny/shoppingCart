var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

var PRODUCT_DATA_FILE = path.join(__dirname, './data/server-product-data.json');
var CART_DATA_FILE = path.join(__dirname, './data/server-cart-data.json');

app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});


app.set('port', (process.env.PORT || 8080));

app.use(express.json());  // application/json
app.use(express.urlencoded({extended: true}));  // application/x-www-form-urlencoded

// 获取购物车中的商品
app.get('/api/cart', function(req, res) {
  fs.readFile(CART_DATA_FILE, 'utf8', function(err, cartProducts) {

    if (err) {
      throw err;
    }

    try {
      cartProducts = JSON.parse(cartProducts)
    } catch (error) {
      throw error;
    }

    res.status(200).send(cartProducts);
  });
});

// 将商品添加到购物车
app.post('/api/cart', function(req, res) {

  fs.readFile(PRODUCT_DATA_FILE, 'utf8', function(err, products) {

    if (err) {
      throw err;
    }

    try {
      products = JSON.parse(products)
    } catch (error) {
      throw error;
    }

    // 找到要加入购物车中的商品
    var foundProduct = products.find(function(product) {
      return product.id === req.body.id;
    });

    // 给找到的商品添加 quantity 属性，表示该商品的数量，初始值为 1
    foundProduct.quantity = 1;

    // {
    //   "id": 2,
    //   "title": "旺旺大礼包",
    //   "description": "你旺，我旺，大家旺。",
    //   "price": 29.99,
    //   "quantity": 1
    // },

    // 读取购物车中的所有商品
    fs.readFile(CART_DATA_FILE, 'utf8', function(err, cartProducts) {
      
      if (err) {
        throw err;
      }
      
      try {
        cartProducts = JSON.parse(cartProducts)
      } catch (error) {
        throw error;
      }

      // 标识购物车中是否有该商品
      var cartProductExists = false;

      // 判断购物车中是否已经存在该商品，如果存在，则数量加一
      cartProducts.map(function (cartProduct) {
        if (cartProduct.id === foundProduct.id) {
          cartProduct.quantity++;
          cartProductExists = true;
        }
      });

      // 如果购物车没有该商品，则将该商品加入购物车
      if (!cartProductExists) cartProducts.push(foundProduct);

      // 
      fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), function() {
        res.status(200).send(cartProducts);
      });
    });
  });
})

// 清空购物车
app.delete('/api/cart/delete', function(req, res) {

  fs.readFile(CART_DATA_FILE, 'utf8', function(err, cartProducts) {
      
    if (err) {
      throw err;
    }
    
    try {
      cartProducts = JSON.parse(cartProducts)
    } catch (error) {
      throw error;
    }

    console.log(req.query.id)

    // 遍历购物车中的商品
    cartProducts.map(function(cartProduct, index) {
      // 如果购物车中被删除的商品数量大于1，则数量减1
      if (cartProduct.id == req.query.id && cartProduct.quantity > 1) {
        cartProduct.quantity--;

        // 如果购物车中被删除的商品数量等于1，则删除该商品
      } else if (cartProduct.id == req.query.id && cartProduct.quantity === 1) {
        cartProducts.splice(index, 1);
      }
    });

    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), function() {
      res.status(200).send(cartProducts);
    });
  });
});

// 清空购物车
app.delete('/api/cart/delete/all', function(req, res) {
  fs.writeFile(CART_DATA_FILE, '[]', function(){
    res.status(200).send([]);
  })
});

app.get('/api/product', function(req, res) {
  fs.readFile(PRODUCT_DATA_FILE, 'utf8', function(err, products) {

    if (err) {
      throw err;
    }

    try {
      products = JSON.parse(products)
    } catch (error) {
      throw error;
    }

    res.status(200).send(products);
  });
});

app.listen(app.get('port'), function() {
  console.log(`Server running at: http://localhost:${app.get('port')}`);
});
