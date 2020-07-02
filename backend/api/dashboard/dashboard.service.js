const pool = require("../../config/database");

module.exports = {
    //receives data from the controller and receives a callBack function if code is successful
    //updates the user's dashboard
    createDash: (data, callBack) => {
        pool.query(
            `insert into dashb(uid, eventDate, eventName, cocktailPref, songEnergy, songDecade, lastUpdate) 
                    values(?,?,?,?,?,?,?)`,
            [
                data.uid,
                data.eventDate,
                data.eventName,
                data.cocktailPref,
                data.songEnergy,
                data.songDecade,
                data.lastUpdate,
            ],
            //if we get a results then error is null
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //otherwise we don't have an error
                return callBack(null, results);
            }
        );
    },

    updateDash: (data, callBack) => {
        pool.query(
            `update dashb set eventDate = ?, eventName = ?, cocktailPref = ?, songEnergy = ?, songDecade = ?, lastUpdate = ? where uid = ?`,
            [
                data.eventDate,
                data.eventName,
                data.cocktailPref,
                data.songEnergy,
                data.songDecade,
                data.lastUpdate,
                data.uid
            ],
            //if we get a results then error is null
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //otherwise we don't have an error
                return callBack(null, results);
            }
        );
    },

    //retrieves dashboard details by uid
    getDashbyUID: (uid, callBack) => {
        pool.query(
            `select * from dashb where uid = ?`,
            [uid],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //results is an array format so we only need 1 result (the user's dashboard)
                return callBack(null, results[0]);
            }
        );
    },

    //retrieves a song and its respective artist artist from songs table
    getData: (data, callBack) => {
        if (data.type == "song") {
            pool.query(
                `select sname, artist from songs where decade = ? and energy >= ? and energy <= ? order by rand() limit 1`,
                [data.decade, data.p1, data.p2],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results[0]);
                }
            );
        }
        //retrieves a cocktail and its respective category + ingredients
        else if (data.type == "cocktail") {
            pool.query(
                `select * from cocktails where category = ? order by rand() limit 1`,
                [data.category],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results[0]);
                }
            );
        }
        //retrieves a movie by its respective genre
        else if (data.type == "movie") {
            pool.query(
                `select * from movies where genre = ? order by rand() limit 1`,
                [data.genre],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, results[0]);
                }
            );
        }
    }
};