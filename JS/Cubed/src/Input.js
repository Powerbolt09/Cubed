var input = {};

/// <summary>
/// Creates and dispatches a new DOM event on "element"
/// </summary>
input.newEvent = function(element, evt, callBack) {
    $(element).on(evt, callBack);
}

///<summary>
/// Removes a DOM event from "element"
///</summary>
input.removeEvent = function(element, evt, opt) {
    $(element).off(evt, opt);
}

module.exports = input;
