"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BOND_CLEAN = "6";

var FREQUENCY_VALUES = {
  1: "One Off Service",
  4: "Weekly",
  3: "Fortnightly",
  5: "Every 3 Weeks",
  2: "Monthly",
  6: "Bond Clean/Move In Move Out"
};

var BEDROOM_VALUES = {
  12: 1,
  2: 2,
  8: 3,
  9: 4,
  5: 5,
  6: 6
};

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
  }

  _createClass(Container, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "container", style: this.props.style },
        React.createElement(CleaningForm, this.props)
      );
    }
  }]);

  return Container;
}(React.Component);

var CleaningForm = function (_React$Component2) {
  _inherits(CleaningForm, _React$Component2);

  function CleaningForm(props) {
    _classCallCheck(this, CleaningForm);

    var _this2 = _possibleConstructorReturn(this, (CleaningForm.__proto__ || Object.getPrototypeOf(CleaningForm)).call(this, props));

    _this2.onNameChange = function (event) {
      _this2.setState({
        firstName: event.target.value
      });
    };

    _this2.onEmailChange = function (event) {
      _this2.setState({
        email: event.target.value
      });
    };

    _this2.onNumberChange = function (event) {
      _this2.setState({
        phoneNumber: event.target.value
      });
    };

    _this2.onBedroomsChange = function (event) {
      _this2.setState({
        bedrooms: event.target.value
      });
    };

    _this2.onBathroomsChange = function (event) {
      _this2.setState({
        bathrooms: event.target.value
      });
    };

    _this2.onFrequencyChange = function (event) {
      _this2.setState({
        frequency: event.target.value
      });
    };

    _this2.handleSubmit = function (event) {
      _this2.onBookClick();
      event.preventDefault();
    };

    _this2.onBookClick = function () {
      if (!_this2.inputsComplete()) return;
      fetch("https://script.google.com/macros/s/AKfycbwVLBJyzQmJexJsKopeMiy9athlJieCYgeRVOPJrHJmBNzLx7X4/exec", {
        method: "post",
        body: JSON.stringify({
          firstName: _this2.state.firstName,
          email: _this2.state.email,
          phoneNumber: _this2.state.phoneNumber,
          frequency: FREQUENCY_VALUES[_this2.state.frequency],
          bedrooms: BEDROOM_VALUES[_this2.state.bedrooms],
          bathrooms: _this2.state.bathrooms,
          source: window.location.href
        })
      }).then(function (response) {
        var newLocation = _this2.createRedirectLocation();
        newLocation = _this2.applyDiscountCode(newLocation);
        window.location.href = newLocation;
      });
    };

    _this2.inputsComplete = function () {
      var warnings = [];

      if (_this2.state.firstName === "") {
        warnings.push("firstName");
      }

      // TODO: Add validation for phone number
      if (_this2.state.phoneNumber === "") {
        warnings.push("phoneNumber");
      }

      if (_this2.state.email === "" || !_this2.validateEmail(_this2.state.email)) {
        warnings.push("email");
      }

      if (warnings.length > 0) {
        _this2.setState({
          warnings: warnings
        });
        return false;
      } else {
        return true;
      }
    };

    _this2.createRedirectLocation = function () {
      if (_this2.state.frequency === BOND_CLEAN) {
        return "http://snapclean.com.au/booking-page/?first_name=" + _this2.state.firstName + "&email=" + _this2.state.email + "&phone=" + _this2.state.phoneNumber + "&service_id=" + _this2.state.bedrooms + "&pricing_parameter[1]=" + _this2.state.bathrooms + "&frequency_id=1&extra[20]=1";
      } else {
        return "http://snapclean.com.au/booking-page/?first_name=" + _this2.state.firstName + "&email=" + _this2.state.email + "&phone=" + _this2.state.phoneNumber + "&service_id=" + _this2.state.bedrooms + "&pricing_parameter[1]=" + _this2.state.bathrooms + "&frequency_id=" + _this2.state.frequency;
      }
    };

    _this2.applyDiscountCode = function (redirectLocation) {
      return _this2.props.discountCode ? redirectLocation + "&rcode=" + _this2.props.discountCode : redirectLocation;
    };

    _this2.getInputStyle = function (name) {
      if (_this2.state.warnings.indexOf(name) > -1) {
        return {
          borderWidth: 2,
          borderColor: "red"
        };
      } else {
        return {
          border: "none"
        };
      }
    };

    _this2.renderOptionA = function () {
      return React.createElement(
        "div",
        { className: "selectionContainer", id: "selectionContainer1" },
        _this2.renderNameInput(),
        _this2.renderEmailInput(),
        _this2.renderPhoneNumberInput(),
        _this2.renderBedroomSelection(),
        _this2.renderBathroomSelection(),
        _this2.renderFrequencySelection()
      );
    };

    _this2.renderOptionB = function () {
      return React.createElement(
        "div",
        { className: "selectionContainer", id: "selectionContainer2" },
        React.createElement(
          "div",
          { className: "selectionRow" },
          _this2.renderNameInput(),
          _this2.renderEmailInput(),
          _this2.renderPhoneNumberInput()
        ),
        React.createElement(
          "div",
          { className: "selectionRow" },
          _this2.renderBedroomSelection(),
          _this2.renderBathroomSelection(),
          _this2.renderFrequencySelection()
        )
      );
    };

    _this2.renderOptionC = function () {
      return React.createElement(
        "div",
        { className: "selectionContainer", id: "selectionContainer2" },
        React.createElement(
          "div",
          { className: "selectionRow" },
          _this2.renderNameInput(),
          _this2.renderPhoneNumberInput()
        ),
        React.createElement(
          "div",
          { className: "selectionRow" },
          _this2.renderEmailInput(),
          _this2.renderFrequencySelection()
        ),
        React.createElement(
          "div",
          { className: "selectionRow" },
          _this2.renderBedroomSelection(),
          _this2.renderBathroomSelection()
        )
      );
    };

    _this2.renderNameInput = function () {
      return React.createElement("input", {
        type: "text",
        className: "textInput",
        style: _this2.getInputStyle("firstName"),
        value: _this2.state.firstName,
        onChange: _this2.onNameChange,
        placeholder: "First Name"
      });
    };

    _this2.renderPhoneNumberInput = function () {
      return React.createElement("input", {
        type: "text",
        className: "textInput",
        style: _this2.getInputStyle("phoneNumber"),
        value: _this2.state.phoneNumber,
        onChange: _this2.onNumberChange,
        placeholder: "Phone Number"
      });
    };

    _this2.renderEmailInput = function () {
      return React.createElement("input", {
        type: "text",
        className: "textInput",
        style: _this2.getInputStyle("email"),
        value: _this2.state.email,
        onChange: _this2.onEmailChange,
        placeholder: "Email"
      });
    };

    _this2.renderBedroomSelection = function () {
      return React.createElement(
        "select",
        { value: _this2.state.bedrooms, onChange: _this2.onBedroomsChange },
        React.createElement(
          "option",
          { value: "12" },
          "1 Bedroom"
        ),
        React.createElement(
          "option",
          { value: "2" },
          "2 Bedrooms"
        ),
        React.createElement(
          "option",
          { value: "8" },
          "3 Bedrooms"
        ),
        React.createElement(
          "option",
          { value: "9" },
          "4 Bedrooms"
        ),
        React.createElement(
          "option",
          { value: "5" },
          "5 Bedrooms"
        ),
        React.createElement(
          "option",
          { value: "6" },
          "6 Bedrooms"
        )
      );
    };

    _this2.renderBathroomSelection = function () {
      return React.createElement(
        "select",
        { value: _this2.state.bathrooms, onChange: _this2.onBathroomsChange },
        React.createElement(
          "option",
          { value: "1" },
          "1 Bathroom"
        ),
        React.createElement(
          "option",
          { value: "2" },
          "2 Bathrooms"
        ),
        React.createElement(
          "option",
          { value: "3" },
          "3 Bathrooms"
        ),
        React.createElement(
          "option",
          { value: "4" },
          "4 Bathrooms"
        ),
        React.createElement(
          "option",
          { value: "5" },
          "5 Bathrooms"
        ),
        React.createElement(
          "option",
          { value: "6" },
          "6 Bathrooms"
        )
      );
    };

    _this2.renderFrequencySelection = function () {
      return React.createElement(
        "select",
        { value: _this2.state.frequency, onChange: _this2.onFrequencyChange },
        React.createElement(
          "option",
          { value: "3" },
          "Fortnightly"
        ),
        React.createElement(
          "option",
          { value: "4" },
          "Weekly"
        ),
        React.createElement(
          "option",
          { value: "5" },
          "Every 3 Weeks"
        ),
        React.createElement(
          "option",
          { value: "2" },
          "Monthly"
        ),
        React.createElement(
          "option",
          { value: "1" },
          "One Off Service"
        ),
        React.createElement(
          "option",
          { value: "6" },
          "Move In Move Out"
        )
      );
    };

    _this2.renderSelectionItems = function () {
      if (_this2.props.option === "a") {
        return _this2.renderOptionA();
      } else if (_this2.props.option === "b") {
        return _this2.renderOptionB();
      } else if (_this2.props.option === "c") {
        return _this2.renderOptionC();
      }
    };

    _this2.state = {
      firstName: "",
      email: "",
      phoneNumber: "",
      bedrooms: "12",
      bathrooms: "1",
      frequency: "3",
      warnings: []
    };
    return _this2;
  }

  // Triggers when the form is submitted


  // Sanitizes the inputs, adds warnings to state if they are incomplete


  // Creates a URL to redirect to based on parameters
  // TODO: Potentially change to HTTPS URL


  // Applies a discount code to the new URL if it has been specified


  _createClass(CleaningForm, [{
    key: "validateEmail",


    // Validates an email address
    value: function validateEmail(email) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    }

    // Validates a phone number(simple)

  }, {
    key: "validatePhoneNumber",
    value: function validatePhoneNumber(number) {
      var regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      return regex.test(number);
    }

    // Gets the style for inputs, so it will show a red line if they are un-filled


    // Renders option A (1x1)


    // Renders option B (3x2)


    // Renders option C

  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "formContainer" },
        React.createElement(
          "h1",
          { id: "formTitle" },
          "Get an online quote in seconds"
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleSubmit },
          this.renderSelectionItems(),
          React.createElement(
            "div",
            { id: "submitContainer" },
            React.createElement("input", {
              id: "submitButton",
              type: "submit",
              value: "VIEW YOUR PRICE ONLINE NOW"
            })
          )
        )
      );
    }
  }]);

  return CleaningForm;
}(React.Component);

CleaningForm.defaultProps = {
  option: "b"
};
