class Field extends React.Component {
  constructor() {
    super();
    this.state = {
      focus: false };

  }

  componentDidMount() {
    if (this.props.focus)
    this.setState({ focus: true });
  }

  onBlur() {
    const { value, onLeave } = this.props;
    if (value && onLeave) onLeave();
    this.setState({ focus: true });
  }

  onFocus() {
    this.props.onFocus();
    this.setState({ focus: true });
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  handleKeyUp(e) {
    switch (e.key) {
      case 'Enter':
        this.onBlur();
        break;}

  }

  render() {

    return React.createElement("div", { className: "field" },
    React.createElement("label", { htmlFor: this.props.id, className: this.props.value ? "focus" : "" }, this.props.label),
    React.createElement("input", {
      id: this.props.id,
      type: "text",
      value: this.props.value,
      onChange: e => this.onChange(e),
      onFocus: () => this.onFocus(),
      on_Blur: () => this.onBlur(),
      onClick: () => this.onFocus(),
      onKeyUp: e => this.handleKeyUp(e) }));


  }}


class Next extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "next" },
      React.createElement("svg", { viewBox: "0 0 20 20", "enable-background": "new 0 0 20 20" },
      React.createElement("path", { d: "M9.163,4.516c0.418,0.408,4.502,4.695,4.502,4.695C13.888,9.43,14,9.715,14,10s-0.112,0.57-0.335,0.787 c0,0-4.084,4.289-4.502,4.695c-0.418,0.408-1.17,0.436-1.615,0c-0.446-0.434-0.481-1.041,0-1.574L11.295,10L7.548,6.092 c-0.481-0.533-0.446-1.141,0-1.576C7.993,4.08,8.745,4.107,9.163,4.516z" }))));





  }}


class Group extends React.Component {
  render() {
    const { active, done, doneWeight, hide } = this.props;

    let classNames = ["group"];

    if (active) classNames.push("active");

    if (done) classNames.push("done");

    if (doneWeight) classNames.push(`weight${this.props.doneWeight}`);

    if (hide) return null;

    return (
      React.createElement("div", { className: classNames.join(" ") },
      this.props.children));


  }}


class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      activeField: 1 };

  }

  clear() {
    this.setState({
      activeField: 1,
      name: undefined,
      email: undefined,
      company: undefined });

  }

  goToField(num) {
    this.setState({ activeField: num });
  }

  submit(e) {
    e.preventDefault();
    const { email, name, company } = this.state;
    if (email && name && company) {
      this.goToField(4);
    } else {

    }
  }

  render() {
    const { activeField, email, name, company } = this.state;

    if (activeField === 4) {
      return (
        React.createElement("div", null,
        React.createElement("h2", null, "Thanks!"),
        React.createElement("p", null,
        React.createElement("a", { onClick: () => this.clear(), className: "button" }, "Start Over"))));





    }

    return (
      React.createElement("div", { className: "form" },
      React.createElement("h3", null, "Contact Us"),


      React.createElement("form", { onSubmit: e => this.submit(e) },
      React.createElement(Group, {
        active: activeField === 1,
        done: activeField > 1,
        doneWeight: activeField - 1,
        hide: activeField === 4 },

      React.createElement(Field, {
        value: email,
        label: "Email",
        id: "email",
        onChange: value => this.setState({ email: value }),
        onFocus: () => this.goToField(1),
        onLeave: () => this.goToField(2) }),

      email && React.createElement(Next, { onClick: () => this.goToField(2) })),

      React.createElement(Group, {
        active: activeField === 2,
        done: activeField > 2,
        doneWeight: activeField - 2,
        hide: activeField === 4 },

      React.createElement(Field, {
        value: name,
        label: "Name",
        id: "name",
        onChange: value => this.setState({ name: value }),
        onFocus: () => this.goToField(2),
        onLeave: () => this.goToField(3) }),

      name && React.createElement(Next, { onClick: () => this.goToField(3) })),

      React.createElement(Group, {
        active: activeField === 3,
        done: activeField > 3,
        doneWeight: activeField - 3,
        hide: activeField === 4 },

      React.createElement(Field, {
        value: company,
        id: "company",
        label: "Company",
        onChange: value => this.setState({ company: value }),
        onFocus: () => this.goToField(3) }),

      React.createElement("button", { className: "button -submit", type: "submit" }, "SUBMIT")))));




  }}


React.render(React.createElement(Form, null), document.getElementById('app'));