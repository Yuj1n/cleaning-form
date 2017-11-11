const BOND_CLEAN = "6";

const FREQUENCY_VALUES = {
  1: "One Off Service",
  4: "Weekly",
  3: "Fortnightly",
  5: "Every 3 Weeks",
  2: "Monthly",
  6: "Bond Clean/Move In Move Out"
};

const BEDROOM_VALUES = {
  12: 1,
  2: 2,
  8: 3,
  9: 4,
  5: 5,
  6: 6
};

class Container extends React.Component {
  render() {
    return (
      <div id="reactContainer" style={this.props.style}>
        <CleaningForm {...this.props} />
      </div>
    );
  }
}

class CleaningForm extends React.Component {
  static defaultProps = {
    option: "b"
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      phoneNumber: "",
      bedrooms: "12",
      bathrooms: "1",
      frequency: "3",
      warnings: []
    };
  }

  onNameChange = event => {
    this.setState({
      firstName: event.target.value
    });
  };

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  onNumberChange = event => {
    this.setState({
      phoneNumber: event.target.value
    });
  };

  onBedroomsChange = event => {
    this.setState({
      bedrooms: event.target.value
    });
  };

  onBathroomsChange = event => {
    this.setState({
      bathrooms: event.target.value
    });
  };

  onFrequencyChange = event => {
    this.setState({
      frequency: event.target.value
    });
  };

  // Handles a submit event(enter key, button click etc.)
  handleSubmit = event => {
    this.onBookClick();
    event.preventDefault();
  };

  // Triggers when the form is submitted
  onBookClick = () => {
    if (!this.inputsComplete()) return;
    fetch(
      "https://script.google.com/macros/s/AKfycbwVLBJyzQmJexJsKopeMiy9athlJieCYgeRVOPJrHJmBNzLx7X4/exec",
      {
        method: "post",
        body: JSON.stringify({
          firstName: this.state.firstName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          frequency: FREQUENCY_VALUES[this.state.frequency],
          bedrooms: BEDROOM_VALUES[this.state.bedrooms],
          bathrooms: this.state.bathrooms,
          source: window.location.href
        })
      }
    ).then(response => {
      var newLocation = this.createRedirectLocation();
      newLocation = this.applyDiscountCode(newLocation);
      window.location.href = newLocation;
    });
  };

  // Sanitizes the inputs, adds warnings to state if they are incomplete
  inputsComplete = () => {
    let warnings = [];

    if (this.state.firstName === "") {
      warnings.push("firstName");
    }

    // TODO: Add validation for phone number
    if (this.state.phoneNumber === "") {
      warnings.push("phoneNumber");
    }

    if (this.state.email === "" || !this.validateEmail(this.state.email)) {
      warnings.push("email");
    }

    if (warnings.length > 0) {
      this.setState({
        warnings: warnings
      });
      return false;
    } else {
      return true;
    }
  };

  // Creates a URL to redirect to based on parameters
  // TODO: Potentially change to HTTPS URL
  createRedirectLocation = () => {
    if (this.state.frequency === BOND_CLEAN) {
      return `https://snapclean.com.au/booking-page/?first_name=${this.state.firstName}&email=${this.state.email}&phone=${this.state.phoneNumber}&service_id=${this.state.bedrooms}&pricing_parameter[1]=${this.state.bathrooms}&frequency_id=1&extra[20]=1`;
    } else {
      return `https://snapclean.com.au/booking-page/?first_name=${this.state.firstName}&email=${this.state.email}&phone=${this.state.phoneNumber}&service_id=${this.state.bedrooms}&pricing_parameter[1]=${this.state.bathrooms}&frequency_id=${this.state.frequency}`;
    }
  };

  // Applies a discount code to the new URL if it has been specified
  applyDiscountCode = redirectLocation => {
    return this.props.discountCode
      ? `${redirectLocation}&rcode=${this.props.discountCode}`
      : redirectLocation;
  };

  // Validates an email address
  validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  // Validates a phone number(simple)
  validatePhoneNumber(number) {
    var regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    return regex.test(number);
  }

  // Gets the style for inputs, so it will show a red line if they are un-filled
  getInputStyle = name => {
    if (this.state.warnings.indexOf(name) > -1) {
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

  // Renders option A (1x1)
  renderOptionA = () => {
    return (
      <div className="selectionContainer">
        {this.renderNameInput()}
        {this.renderEmailInput()}
        {this.renderPhoneNumberInput()}
        {this.renderBedroomSelection()}
        {this.renderBathroomSelection()}
        {this.renderFrequencySelection()}
      </div>
    );
  };

  // Renders option B (3x2)
  renderOptionB = () => {
    return (
      <div className="selectionContainer">
        <div className="selectionRow">
          {this.renderNameInput()}
          {this.renderEmailInput()}
          {this.renderPhoneNumberInput()}
        </div>
        <div className="selectionRow">
          {this.renderBedroomSelection()}
          {this.renderBathroomSelection()}
          {this.renderFrequencySelection()}
        </div>
      </div>
    );
  };

  // Renders option C (2x3)
  renderOptionC = () => {
    return (
      <div className="selectionContainer">
        <div className="selectionRow">
          {this.renderNameInput()}
          {this.renderPhoneNumberInput()}
        </div>
        <div className="selectionRow">
          {this.renderEmailInput()}
          {this.renderFrequencySelection()}
        </div>
        <div className="selectionRow">
          {this.renderBedroomSelection()}
          {this.renderBathroomSelection()}
        </div>
      </div>
    );
  };

  renderNameInput = () => {
    return (
      <input
        type="text"
        className="textInput"
        style={this.getInputStyle("firstName")}
        value={this.state.firstName}
        onChange={this.onNameChange}
        placeholder="First Name"
      />
    );
  };

  renderPhoneNumberInput = () => {
    return (
      <input
        type="text"
        className="textInput"
        style={this.getInputStyle("phoneNumber")}
        value={this.state.phoneNumber}
        onChange={this.onNumberChange}
        placeholder="Phone Number"
      />
    );
  };

  renderEmailInput = () => {
    return (
      <input
        type="text"
        className="textInput"
        style={this.getInputStyle("email")}
        value={this.state.email}
        onChange={this.onEmailChange}
        placeholder="Email"
      />
    );
  };

  renderBedroomSelection = () => {
    return (
      <select value={this.state.bedrooms} onChange={this.onBedroomsChange}>
        <option value="12">1 Bedroom</option>
        <option value="2">2 Bedrooms</option>
        <option value="8">3 Bedrooms</option>
        <option value="9">4 Bedrooms</option>
        <option value="5">5 Bedrooms</option>
        <option value="6">6 Bedrooms</option>
      </select>
    );
  };

  renderBathroomSelection = () => {
    return (
      <select value={this.state.bathrooms} onChange={this.onBathroomsChange}>
        <option value="1">1 Bathroom</option>
        <option value="2">2 Bathrooms</option>
        <option value="3">3 Bathrooms</option>
        <option value="4">4 Bathrooms</option>
        <option value="5">5 Bathrooms</option>
        <option value="6">6 Bathrooms</option>
      </select>
    );
  };

  renderFrequencySelection = () => {
    return (
      <select value={this.state.frequency} onChange={this.onFrequencyChange}>
        <option value="3">Fortnightly</option>
        <option value="4">Weekly</option>
        <option value="5">Every 3 Weeks</option>
        <option value="2">Monthly</option>
        <option value="1">One Off Service</option>
        <option value="6">Move In Move Out</option>
      </select>
    );
  };

  // Renders the inputs and selects depending on the option specified
  renderSelectionItems = () => {
    if (this.props.option === "a") {
      return this.renderOptionA();
    } else if (this.props.option === "b") {
      return this.renderOptionB();
    } else if (this.props.option === "c") {
      return this.renderOptionC();
    }
  };

  render() {
    return (
      <div id="bookingFormContainer">
        <h1 id="formTitle">Get an online quote in seconds</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelectionItems()}
          <div id="submitContainer">
            <input
              id="submitButton"
              type="submit"
              value="VIEW YOUR PRICE ONLINE NOW"
            />
          </div>
        </form>
      </div>
    );
  }
}

const CLEANING_TYPES = {
  REGULAR: "regular",
  DEEP: "deep",
  MOVE: "move"
};

class InteractiveCheckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: CLEANING_TYPES.REGULAR
    };
  }

  render() {
    return (
      <div id="interactiveCheckList">
        <div id="optionButtonsContainer">
          <button
            className={this.getButtonClass(CLEANING_TYPES.REGULAR)}
            onClick={() => this.changeSelection(CLEANING_TYPES.REGULAR)}
          >
            REGULAR
          </button>
          <button
            className={this.getButtonClass(CLEANING_TYPES.DEEP)}
            onClick={() => this.changeSelection(CLEANING_TYPES.DEEP)}
          >
            DEEP
          </button>
          <button
            className={this.getButtonClass(CLEANING_TYPES.MOVE)}
            onClick={() => this.changeSelection(CLEANING_TYPES.MOVE)}
          >
            MOVE IN/OUT
          </button>
        </div>
        {this.renderCheckListRows()}
      </div>
    );
  }

  renderCheckListRows = () => {
    if (
      this.props.checkListPages !== null &&
      this.props.checkListPages !== undefined
    ) {
      return (
        <div id="checkListsContainer">
          <div className="checkListRow">
            {this.renderCheckList(this.props.checkListPages.ALWAYS_INCLUDED)}
            {this.renderCheckList(this.props.checkListPages.ALL_AREAS)}
            {this.renderCheckList(this.props.checkListPages.KITCHEN)}
          </div>
          <div className="checkListRow">
            {this.renderCheckList(this.props.checkListPages.BEDROOMS)}
            {this.renderCheckList(this.props.checkListPages.BATHROOMS)}
            {this.renderCheckList(this.props.checkListPages.OTHER)}
          </div>
        </div>
      );
    }
  };

  getButtonClass = type => {
    return this.state.currentSelection === type
      ? "selectedButton"
      : "hiddenButton";
  };

  changeSelection = type => {
    this.setState({
      currentSelection: type
    });
  };

  renderCheckList = page => {
    return (
      <div className="checkListPage">
        <h3>{page.title}</h3>
        <div>
          <ul>
            {this.renderItemsList(page.items)}
          </ul>
        </div>
      </div>
    );
  };

  renderItemsList = items => {
    let views = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      views.push(
        <li className={this.getListItemClass(item)} key={`item-${i}`}>
          {item.name}
        </li>
      );
    }
    return views;
  };

  getListItemClass = item => {
    return item.types.includes(this.state.currentSelection)
      ? ""
      : "notIncluded";
  };
}
