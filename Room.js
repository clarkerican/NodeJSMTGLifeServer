/**
 * Created by Erica on 7/18/2016.
 */

var Room = {
    constructor : function(player1, player2, sessionID, encrypto){
        this.player1 = player1,
        this.score1 = 20;
        this.player2 = player2;
        this.score2 = 20;
        this.sessionID = sessionID;
        this.encrypto = encrypto;
    },
    set score1(score){
        this.score1 = score;
    },
    set score2(score){
        this.score2 = score;
    }
};

module.exports = Room;