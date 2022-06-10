// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Todolist {
    struct Todo {
        string _content;
        address _assignee;
        bool _done;
    }

    mapping(address => Todo[]) usersTodos;

    function getTodo(uint256 _todoIndex) external view returns (Todo memory) {
        return usersTodos[msg.sender][_todoIndex];
    }

    function getTodosCount() external view returns (uint256) {
        return usersTodos[msg.sender].length;
    }

    function addTodo(string calldata _content) external {
        usersTodos[msg.sender].push(
            Todo({_content: _content, _assignee: msg.sender, _done: false})
        );
    }

    function getTask(uint256 _todoIndex) external view returns (Todo memory) {
        Todo storage todo = usersTodos[msg.sender][_todoIndex];
        return todo;
    }

    function updtateStatus(uint256 _todoIndex, bool _status) external {
        usersTodos[msg.sender][_todoIndex]._done = _status;
    }

    function deleteTodo(uint256 _todoIndex) external {
        delete usersTodos[msg.sender][_todoIndex];
    }
}
