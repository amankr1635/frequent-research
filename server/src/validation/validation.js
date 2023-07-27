const isValidName = function (name) {
    const nameRegex = /^[a-z A-Z_]{3,30}$/;
    return nameRegex.test(name);
  };

  const isValidEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  const isValidDate = function(date){
    const dateRegex = /^(?:(?:(?:1[6-9]|[2-9]\d)?\d{2})-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|1\d|2[0-8])|(?:1[6-9]|[2-9]\d)?\d{2}-(?:0?[13-9]|1[0-2])-(?:29|30)|(?:1[6-9]|[2-9]\d)?\d{2}-(?:0?[13578]|1[02])-31)$/;
    return dateRegex.test(date)
}
module.exports = {isValidName,isValidEmail,isValidDate}