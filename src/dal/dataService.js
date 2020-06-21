export function getBreweryData() {
    return new Promise((resolve, reject) => {
        resolve([
            {
                id: 0,
                name: "Michael's brewery",
                info: "Sells coca cola in Castlereagh",
                placeid: "ChIJq7_L3RUJYUgRT9ixS08CDIg",
                address: "Castlereagh College",
                lat: 54.577658,
                lon: -5.892967,
                distributors: [
                    {
                        id:0,
                        name: "Michael",
                        contact1: "test@test.com",
                        address:"Castlereagh College",
                        lat: 54.577658,
                        lon: -5.892967,
                        
                    },
                    {
                        id:1,
                        name: "A Distributor",
                        contact1: "test@test.com",
                        address: "Guildhall, Derry/Londonderry",
                        lat: 54.997816,
                        lon: -7.319335
                    },
                    {
                        id:2,
                        name: "Steven",
                        contact1: "test@test.com",
                        address:"3 Hill St, Belfast",
                        lat: 54.601804,
                        lon: -5.926249
                    }
                ]
            },
            {
                id: 1,
                name: "Geoff's brewery",
                info: "Sells something at City Hall",
                placeid: null,
                address: "Donegall Square N, Belfast BT1 5GS",
                lat: 54.596770,
                lon: -5.930128,
                distributors: [
                    {
                        id:0,
                        name: "Geoff",
                        contact1: "test@test.com",
                        address:"Donegall Square N, Belfast",
                        lat: 54.596770,
                        lon: -5.930128
                    },
                    {
                        id:1,
                        name: "A Distributor",
                        contact1: "test@test.com",
                        address: "Guildhall, Derry/Londonderry",
                        lat: 54.997816,
                        lon: -7.319335
                    },
                    {
                        id:2,
                        name: "Steven",
                        contact1: "test@test.com",
                        address:"3 Hill St, Belfast",
                        lat: 54.601804,
                        lon: -5.926249
                    }
                ]
            },
            {
                id: 2,
                name: "Steven's brewery",
                info: "Sells beer at the Dirty Onion",
                placeid: null,
                address: "3 Hill St, Belfast BT1 2LA",
                lat: 54.601804,
                lon: -5.926249,
                distributors: [
                    {
                        id:0,
                        name: "Steven",
                        contact1: "test@test.com",
                        address:"3 Hill St, Belfast",
                        lat: 54.601804,
                        lon: -5.926249
                    },
                    {
                        id:1,
                        name: "A Distributor",
                        contact1: "test@test.com",
                        address: "Guildhall, Derry/Londonderry",
                        lat: 54.997816,
                        lon: -7.319335
                    }
                ]
            },
        ]);
    });
}

export default {
    getBreweryData
}