//import necessary packages

    import passport from 'passport';
    import {Strategy} from 'passport-local';
    import {schema, validatePass} from './../model/user.js'

//serialize user into session data

    passport.serializeUser((userRecord, done) =>{

        console.log(`Serializing user: ${userRecord.username}`)
        const userId = userRecord.userId
        done(null, userId) //this stores userId in a session (on a cookie in the client browser)

    });

//deserialize user from session data

    passport.deserializeUser(async(userId, done) =>{

        console.log(`Deserializing user: ${userId}`)
        const found = await schema.findByPk(userId)
        if(found){
            done(null, found)
        } else{
            done(new Error("Error: UserId does not match existing User!"), null)
        }
    });

//add local strategy middleware provided by passport.js

    passport.use(new Strategy(async(username, passport, done) => {

        //find the user
        const found = await schema.findOne({

            where: (username)

        })

        if(!found) return done(new Error("Error: invalid credentials!"), null); //more descriptive error: User can't be found/doesn't exist

        const match = await validatePass(password, found.password)
        if(!match) return done(new Error("Error: Password doesn't match password on file!"), null);

        console.log(`Validated user: ${username}`)
        done(null,found)

    }));
