import React, {Component} from "react";

import "./SearchPanel.css";

class SearchPanel extends Component {

    state = {
        term: ""
    }

    onSearchChenage = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChenage(term);
    }

    render() {
        return (
            <input
                className="form-control search-input"
                placeholder="search"
                value={this.state.term}
                onChange={this.onSearchChenage}
            />

        )
    }
}

export default SearchPanel;