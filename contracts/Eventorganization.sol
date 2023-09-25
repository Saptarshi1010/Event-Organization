// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventOrganization {
    struct Event {
        string name;
        address organiser;
        uint date;
        uint price;
        uint ticketCount;
        uint ticketRemain;
    }
    mapping(uint => Event) public events;
    mapping(address => mapping(uint => uint)) public tickets;

    uint public nextId;

    function createEvent(
        string memory name,
        uint date,
        uint price,
        uint _ticketCount
    ) external {
        require(
            date > block.timestamp,
            "you can organize event for future date"
        );
        require(
            _ticketCount > 0,
            "you can organize event only if you create more ticket"
        );
        events[nextId] = Event(
            name,
            msg.sender,
            date,
            price,
            _ticketCount,
            _ticketCount
        );
        nextId++;
    }

    function buyTicket(uint id, uint quantity) external payable {
        require(events[id].date != 0, " curent event doesnot exist");
        require(events[id].date > block.timestamp, "Event already occured");
        Event storage _event = events[id];
        require(msg.value == (_event.price * quantity), "not enough Ether");
        require(_event.ticketRemain >= quantity, "no tickets");
        _event.ticketRemain -= quantity;
        tickets[msg.sender][id] += quantity;
    }

    function transferTicket(uint id, uint quantity, address to) public {
        require(events[id].date != 0, " cuurent event doesnot exist");
        require(events[id].date > block.timestamp, "Event already occured");
        require(
            tickets[msg.sender][id] >= quantity,
            "you do not have enough tickets"
        );
        tickets[msg.sender][id] -= quantity;
        tickets[to][id] += quantity;
    }
}
