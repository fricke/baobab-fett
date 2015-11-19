(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/cfricke/Workspace/react-chrome-baobab/background.js":[function(require,module,exports){
'use strict';

// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
//
// Can use:
// chrome.tabs.*
// chrome.extension.*

var chrome = window.chrome || {};

chrome.extension.onConnect.addListener(function (port) {

    var extensionListener = function extensionListener(message, sender, sendResponse) {

        if (message.tabId && message.content) {

            //Evaluate script in inspectedPage
            if (message.action === 'code') {
                chrome.tabs.executeScript(message.tabId, { code: message.content });

                //Attach script to inspectedPage
            } else if (message.action === 'script') {
                    chrome.tabs.executeScript(message.tabId, { file: message.content });

                    //Pass message to inspectedPage
                } else {
                        chrome.tabs.sendMessage(message.tabId, message, sendResponse);
                    }

            // This accepts messages from the inspectedPage and
            // sends them to the panel
        } else {
                port.postMessage(message);
            }
        sendResponse(message);
    };

    // Listens to messages sent from the panel
    chrome.extension.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function (port) {
        chrome.extension.onMessage.removeListener(extensionListener);
    });

    // port.onMessage.addListener(function (message) {
    //     port.postMessage(message);
    // });
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    return true;
});

},{}]},{},["/Users/cfricke/Workspace/react-chrome-baobab/background.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJiYWNrZ3JvdW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDT0EsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7O0FBRWpDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksRUFBRTs7QUFFbkQsUUFBSSxpQkFBaUIsR0FBRyxTQUFwQixpQkFBaUIsQ0FBYSxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRTs7QUFFN0QsWUFBRyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7OztBQUc3QixnQkFBRyxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtBQUMxQixzQkFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFDLENBQUM7OztBQUFDLGFBR3JFLE1BQU0sSUFBRyxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUNuQywwQkFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFDLENBQUM7OztBQUFDLGlCQUdyRSxNQUFNO0FBQ0gsOEJBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO3FCQUNqRTs7OztBQUFBLFNBSVIsTUFBTTtBQUNILG9CQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzdCO0FBQ0Qsb0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qjs7O0FBQUMsQUFHRixVQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7QUFFMUQsUUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBUyxJQUFJLEVBQUU7QUFDekMsY0FBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDaEUsQ0FBQzs7Ozs7Q0FNTCxDQUFDLENBQUM7QUFOSSxBQU9QLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFTLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFO0FBQ3pFLFdBQU8sSUFBSSxDQUFDO0NBQ2YsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENocm9tZSBhdXRvbWF0aWNhbGx5IGNyZWF0ZXMgYSBiYWNrZ3JvdW5kLmh0bWwgcGFnZSBmb3IgdGhpcyB0byBleGVjdXRlLlxuLy8gVGhpcyBjYW4gYWNjZXNzIHRoZSBpbnNwZWN0ZWQgcGFnZSB2aWEgZXhlY3V0ZVNjcmlwdFxuLy9cbi8vIENhbiB1c2U6XG4vLyBjaHJvbWUudGFicy4qXG4vLyBjaHJvbWUuZXh0ZW5zaW9uLipcblxudmFyIGNocm9tZSA9IHdpbmRvdy5jaHJvbWUgfHwge307XG5cbmNocm9tZS5leHRlbnNpb24ub25Db25uZWN0LmFkZExpc3RlbmVyKGZ1bmN0aW9uIChwb3J0KSB7XG5cbiAgICB2YXIgZXh0ZW5zaW9uTGlzdGVuZXIgPSBmdW5jdGlvbiAobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcblxuICAgICAgICBpZihtZXNzYWdlLnRhYklkICYmIG1lc3NhZ2UuY29udGVudCkge1xuXG4gICAgICAgICAgICAgICAgLy9FdmFsdWF0ZSBzY3JpcHQgaW4gaW5zcGVjdGVkUGFnZVxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UuYWN0aW9uID09PSAnY29kZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChtZXNzYWdlLnRhYklkLCB7Y29kZTogbWVzc2FnZS5jb250ZW50fSk7XG5cbiAgICAgICAgICAgICAgICAvL0F0dGFjaCBzY3JpcHQgdG8gaW5zcGVjdGVkUGFnZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihtZXNzYWdlLmFjdGlvbiA9PT0gJ3NjcmlwdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChtZXNzYWdlLnRhYklkLCB7ZmlsZTogbWVzc2FnZS5jb250ZW50fSk7XG5cbiAgICAgICAgICAgICAgICAvL1Bhc3MgbWVzc2FnZSB0byBpbnNwZWN0ZWRQYWdlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UobWVzc2FnZS50YWJJZCwgbWVzc2FnZSwgc2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhpcyBhY2NlcHRzIG1lc3NhZ2VzIGZyb20gdGhlIGluc3BlY3RlZFBhZ2UgYW5kXG4gICAgICAgIC8vIHNlbmRzIHRoZW0gdG8gdGhlIHBhbmVsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHNlbmRSZXNwb25zZShtZXNzYWdlKTtcbiAgICB9O1xuXG4gICAgLy8gTGlzdGVucyB0byBtZXNzYWdlcyBzZW50IGZyb20gdGhlIHBhbmVsXG4gICAgY2hyb21lLmV4dGVuc2lvbi5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZXh0ZW5zaW9uTGlzdGVuZXIpO1xuXG4gICAgcG9ydC5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocG9ydCkge1xuICAgICAgICBjaHJvbWUuZXh0ZW5zaW9uLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihleHRlbnNpb25MaXN0ZW5lcik7XG4gICAgfSk7XG5cbiAgICAvLyBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIC8vICAgICBwb3J0LnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIC8vIH0pO1xuXG59KTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHJldHVybiB0cnVlO1xufSk7Il19
