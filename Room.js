/**
 * Created by Erica on 7/18/2016.
 */

function Room(player1, player2, sessionID, encrypto){
        this.player1 = player1,
        this.score1 = 20;
        this.player2 = player2;
        this.score2 = 20;
        this.sessionID = sessionID;
        this.encrypto = encrypto;

};

module.exports = Room;