import React, {Component} from "react";

export default class ItemStatusFilter extends Component {

    render() {

        return (
            <div className="btn-group">

                <button
                    type="button"
                    className="btn btn-info"
                    onClick={this.props.onAllShow}
                >
                    All
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={this.props.onActiveShow}
                >
                    Active
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={this.props.onDoneShow}
                >
                    Done
                </button>

            </div>
        );

    };

}


