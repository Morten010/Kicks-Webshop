import { validate } from "@/src/lib/functions/validate"


describe("Validate function", () => {

    // no user exists
    it("Is created Empty", async () => {
        const response = await validate({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            gender: ""
        })

        expect(response).toEqual({
            firstName: "Required",
            lastName: "Required",
            email: "Required",
            password: "Required",
            gender: "Required"
        })
    })

    // missing last name
    it("Is missing last name", async () => {
        const response = await validate({
            firstName: "test",
            lastName: "",
            email: "test@gmail.com",
            password: "test1234",
            gender: "male"
        })

        expect(response).toEqual({
            firstName: "",
            lastName: "Required",
            email: "",
            password: "",
            gender: ""
        })
    })

    // Missing First name
    it("Is Missing First name", async () => {
        const response = await validate({
            firstName: "",
            lastName: "user",
            email: "test@gmail.com",
            password: "test1234",
            gender: "male"
        })

        expect(response).toEqual({
            firstName: "Required",
            lastName: "",
            email: "",
            password: "",
            gender: ""
        })
    })

    // Missing Email
    it("Is Missing Email", async () => {
        const response = await validate({
            firstName: "test",
            lastName: "user",
            email: "",
            password: "test1234",
            gender: "male"
        })

        expect(response).toEqual({
            firstName: "",
            lastName: "",
            email: "Required",
            password: "",
            gender: ""
        })
    })

    // Missing Password
    it("Is Missing Password", async () => {
        const response = await validate({
            firstName: "test",
            lastName: "user",
            email: "test@gmail.com",
            password: "",
            gender: "male"
        })

        expect(response).toEqual({
            firstName: "",
            lastName: "",
            email: "",
            password: "Required",
            gender: ""
        })
    })

    // Missing Gender
    it("Is Missing Password", async () => {
        const response = await validate({
            firstName: "test",
            lastName: "user",
            email: "test@gmail.com",
            password: "test1234",
            gender: ""
        })

        expect(response).toEqual({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            gender: "Required"
        })
    })

    // user exists
    it("User exists", async () => {

        const response = await validate({
            firstName: "test",
            lastName: "user",
            email: "test@gmail.com",
            password: "test1234",
            gender: "male"
        })

        expect(response).toStrictEqual({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            gender: ""
        })
    })


})