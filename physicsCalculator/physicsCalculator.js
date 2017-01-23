// beginning properties
var properties = {
  xI: 0,
  vI: 0,
  xF: 1,
  t: 1
}


// includes polyfill
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

var equations = [
  {
    needs: ["xC", "a"],
    returns: "t",
    execute: function(prop){
      return prop.xC/prop.a;
    }
  },
  {
    needs: ["xI", "xF"],
    returns: "xC",
    execute: function(prop){
      return prop.xF - prop.xI;
    }
  },
  {
    needs: ["xI", "vI", "t", "a"],
    returns: "xF",
    execute: function(prop){
      return prop.xI + (prop.vI*prop.t) + ((1/2) * prop.a * Math.pow(prop.t, 2));
    }
  },
  {
    needs: ["a", "t"],
    returns: "vC",
    execute: function(prop){
      return prop.a * prop.t;
    }
  },
  {
    needs: ["vF", "vI"],
    returns: "vC",
    execute: function(prop){
      return prop.vF - prop.vI;
    }
  },
  {
    needs: ["vC", "t"],
    returns: "a",
    execute: function(prop){
      return prop.vC/prop.t;
    }
  },
  {
    needs: [],
    returns: "g",
    execute: function(){
      return 9.8;
    }
  },
  {
    needs: ["xC", "vI", "t"],
    returns: "a",
    execute: function(prop){
      return 2*(prop.xC - (prop.vI * prop.t))/Math.pow(prop.t, 2);
    }
  }

]

var canEquate = function(properties, equation){
  var neededProperties = equation.needs;
  var providedProperties = Object.keys(properties);

  for(var i = 0; i < neededProperties.length; i ++){
    if (!providedProperties.includes(neededProperties[i])){
      return false;
    }
  }

  return true;
}

var needsEquate = function(properties, equation){
  var providedProperties = Object.keys(properties);

  return !providedProperties.includes(equation.returns);
}

var getOtherProperties = function(properties, equations){
  var propertiesChanged = false;

  for(var i = 0; i < equations.length; i ++){
    var equation = equations[i];
    if (needsEquate(properties, equation) && canEquate(properties, equation)){
      properties[equation.returns] = equation.execute(properties);
      propertiesChanged = true;
    }
  }

  if (propertiesChanged){
    return getOtherProperties(properties, equations);
  } else {
    return properties;
  }
}

console.log("----------------------------------------------------");
console.log("Initial Properties: ");
console.log(properties);
console.log("");
console.log("Found Properties: ")
console.log(getOtherProperties(properties, equations));
console.log("----------------------------------------------------");
