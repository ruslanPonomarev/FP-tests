import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker/locale/nl';
import exp from "constants";
const { DateTime } = require("luxon");

const randomFirstName = faker.person.firstName()
const randomLastName = faker.person.lastName()
const randomNumber = faker.phone.number()
const randomProfilePhoto = faker.image
const randomInfix = faker.person.middleName()
const randomEmail = faker.internet.email()
// const randomDateJoined = DateTime.now().toFormat('yyyy-MM-dd')
let freelancer_id;

test.beforeAll(async({request})=>{
  const response = await request.post('https://user.fp.test.thebrain4web.com/api/v1/freelancers', {
    data: {
      "email": randomEmail,
    }
  })
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  freelancer_id = data.id;
})

  test.describe("Update Freelancer details @S3b6d359c",() => {
    test('Check the freelancer API updates personal details @T39fe1e9e', async ({request}) => {
      await test.step(`Retrieve persisted freelancer id ${freelancer_id}`, async() => {
        const response = await request.get(`https://user.fp.test.thebrain4web.com/api/v1/freelancers/${freelancer_id}`)
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        console.log(await response.json);
      })

      await test.step(`Update the bio for the employee id ${freelancer_id}`, async ()=>{
        const response = await request.put(`https://user.fp.test.thebrain4web.com/api/v1/freelancers/${freelancer_id}/personal-details`, {
            data: {
              "id": 0,
              "firstName": "Helen",
              "lastName": "Ellen",
              "phoneNumber": "60123456789",
              "profilePhoto": "null",
              "infix": "null"
            }
          });
            expect(response.ok()).toBeTruthy();
      })
    })
  })  

  test.afterAll(async({request})=>{
    const response = await request.delete(`https://user.fp.test.thebrain4web.com/api/v1/freelancers/${freelancer_id}`);
})
