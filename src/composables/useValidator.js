export function useValidator() {
  function stringBetween(v, min, max) {
    if (v) {
      return v.length >= min && v.length <= max;
    }
    return false;
  }

  function numBetween(v, min, max) {
    if (v) {
      return v * 1 >= min && v * 1 <= max;
    }
    return false;
  }

  function numMin(v, min) {
    if (v) {
      return v * 1 >= min;
    }
    return false;
  }

  function required(v) {
    return v != null && v != undefined && v != "";
  }

  function optional(v) {
    return !required(v);
  }

  function phoneNumber(v) {
    if (v) {
      return /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
        v
      );
    }
    return false;
  }

  function email(v) {
    if (v) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
    }
    return false;
  }

  function password(v) {
    if (v) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(v);
    }
    return false;
  }

  function onlyNums(v) {
    if (v) {
      return /^\d+$/g.test(v);
    }
    return false;
  }

  function url(v) {
    if (v) {
      return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
        v
      );
    }
    return false;
  }

  return {
    stringBetween,
    numBetween,
    numMin,
    required,
    phoneNumber,
    email,
    password,
    url,
    optional,
    onlyNums
  };
}
