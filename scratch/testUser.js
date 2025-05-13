import {schema, createUser, hashPass, validatePass} from './../model/user.js'

const user = await createUser("Emily", "Passyword123!!");
console.log(user)

const valid = await validatePass("", user.password)

const invalid = await validPass("Something-Else-ABC?!?!?!", user.password)
if(valid)
{
    console.log('invalid password matched')
}
else
{
    console.log('rejected invalid password')
}