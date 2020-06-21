export  function getBreweryData(){
    return new Promise((resolve,reject)=>{
        resolve([
            {
                id:0,
                name:"Michael's brewery",
                info:"Sells coca cola in Castlereagh",
                placeid:"ChIJq7_L3RUJYUgRT9ixS08CDIg",
                address:"Castlereagh College",
                lat:54.577658,
                lon: -5.892967,
                distributors:[
                    {
                        name:"Michael",
                        contact1:"test@test.com"
                    },
                    {
                        name:"A Distributor",
                        contact1:"test@test.com"
                    }
                ]
            },
            {
                id:1,
                name:"Geoff's brewery",
                info:"Sells something at City Hall",
                placeid:null,
                address:"Donegall Square N, Belfast BT1 5GS",
                lat:54.596770,
                lon:-5.930128,
                distributors:[
                    {
                        name:"Geoff",
                        contact1:"test@test.com"
                    },
                    {
                        name:"A Distributor",
                        contact1:"test@test.com"
                    }
                ]
            },
            {
                id:2,
                name:"Steven's brewery",
                info:"Sells beer at the Dirty Onion",
                placeid:null,
                address:"3 Hill St, Belfast BT1 2LA",
                lat:54.601804,
                lon:-5.926249,
                distributors:[
                    {
                        name:"Steven",
                        contact1:"test@test.com"
                    },
                    {
                        name:"A Distributor",
                        contact1:"test@test.com"
                    }
                ]
            },
        ]);
    });
}

export default {
    getBreweryData
}