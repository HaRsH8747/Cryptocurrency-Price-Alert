var alertsList = [];

function setAlert(_asset,_price,_email,_type){
    alertsList.push({
      asset: _asset,
      price: _price,
      email: _email,
      type: _type.toLowerCase(),
      createdAt: new Date(),
    })
    console.log(alertsList.length);
};

var exportedObject = {setAlert, alertsList};

module.exports = exportedObject;