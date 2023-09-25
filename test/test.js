const { expect } = require("chai");
const { ethers } = require("hardhat");
const toWei = (num) => ethers.utils.parseEther(num.toString());

describe("EventOrganizationContract", function () {
  let organiser, attendee1, attendee2, addrs, EventOrganization, eventorg;

  beforeEach(async function () {
    [organiser, attendee1, attendee2, ...addrs] = await ethers.getSigners();
    EventOrganization = await ethers.getContractFactory("EventOrganization");
    eventorg = await EventOrganization.deploy();
    await eventorg.deployed();
  });
  describe("createEvent", function () {
    it("Creating a event", async function () {
      const eventName = "Example Event";
      const eventdate = Math.floor(Date.now() / 1000) + 3600;
      const eventorganiser = await eventorg.organiser().to.equal(organiser.address);
      await eventorg.createEvent(eventName, eventorganiser, eventdate);
      const newevent = await eventorg.events(0)
      expect(newevent.name).to.equal(eventName);
      expect(newevent.organiser).to.equal(eventorganiser);
      expect(newevent.date).to.equal(eventdate);  // Set event date 1 hour from now
      expect(newevent.ticketprice).to.equal(toWei(price))
      expect(newevent.ticketcount).to.equal(10)
      expect(newevent.ticketcount).to.equal(10)
    })
  });

  describe("Buy Ticket", function () {
    it("Should prevent from buying ticket for an event that doesn't exist", async function () {
      const invalidEventId = 999;
      await expect(eventorg.connect(attendee1).buyTicket(invalidEventId)).to.be.revertedWith(" curent event doesnot exist");
    });
    it("revert if event already occured available", async function () {
      const eventDescription = "This event has already ended.";
      const pastEventDate = Math.floor(Date.now() / 1000) - 3600; // Set event date 1 hour in the past
      await eventorg.createEvent(eventDescription, pastEventDate);
      const eventId = 2;
      await expect(eventorg.connect(attendee1).buyTicket(eventId)).to.be.revertedWith("Event already occured");
    });
    it("buying the tickets of the particular event", async function () {
      await eventorg.connect(attendee1).buyTicket(eventId);
      await eventorg.connect(attendee2).buyTicket(eventId);
      const registrations = await eventorg.buyTicket(eventId);
      expect(registrations.length).to.equal(2);
      expect(registrations[0]).to.equal(attendee1.address);
      expect(registrations[1]).to.equal(attendee2.address);
    });
  });

  describe("Transfer Ticket", function () {
    it("Should prevent from transfering ticket for an event that doesn't exist", async function () {
      const invalidEventId = 999;
      await expect(eventorg.connect(attendee1).transferTicket(invalidEventId)).to.be.revertedWith(" curent event doesnot exist");
    });
    it("revert if event already occured available", async function () {
      const eventDescription = "This event has already ended.";
      const pastEventDate = Math.floor(Date.now() / 1000) - 3600; // Set event date 1 hour in the past
      await eventorg.createEvent(eventDescription, pastEventDate);
      const eventId = 2;
      await expect(eventorg.connect(attendee1).transferTicket(eventId)).to.be.revertedWith("Event already occured");
    });
    it("Creating a event", async function () { })
  });
})


