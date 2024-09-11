const express = require("express");
const reservationsRouter = express.Router();

const { requireUser } = require("./utils");

const {
  getReservation,
  getUsersReservations,
  deleteReservation,
  updateBook,
  getBook,
} = require("../db");

reservationsRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const reservations = await getUsersReservations(req.user.id);
    console.log(reservations);
    res.send("reservations here");
  } catch (err) {
    next(err);
  }
});

reservationsRouter.delete("/:id", requireUser, async (req, res, next) => {
  try {
    //first check if reservation with that id exists
    const reservation = await getReservation(req.params.id);
    console.log("RESERVATION", reservation);
    if (!reservation) {
      next({
        name: "ReservationDoesNotExist",
        message: "Nothing to return here...",
      });
      return;
    } else if (req.user.id !== reservation.userid) {
      next({
        name: "Permission Denied",
        message: "You do not have permission to return this book",
      });
      return;
    } else {
      const deletedReservation = await deleteReservation(req.params.id);
      console.log(deleteReservation);
      const book = await getBook(deleteReservation.bookId);
      if (deletedReservation) {
        updateBook(book.id, true);
      }
      res.send(deleteReservation);
    }
    //if not, throw an error with message - reservation does not exist - STOP
    //If reservatoin is there, check the reservation's userid against logged in user id
    //If they don't match, throw an error - not authorized to return this book
    //If they do match two things -
    //delete the reservation (using delete reservation function)
    //update the book to be available again
  } catch (err) {
    next(err);
  }
});

module.exports = reservationsRouter;
