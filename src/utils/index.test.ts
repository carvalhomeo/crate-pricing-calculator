import {calculatePrice, round} from "."
import { PRICING } from "../data"

describe("Utils", () => {
    it("should round decimal number", () => {
        expect(round(1.005)).toEqual(1.01)
        expect(round(541.438)).toEqual(541.44)
    })
    it("it should calculate price based on selected region, product and number of nodes", () => {
        expect(calculatePrice(PRICING, 'us-west-1' ,'cr1', 2)).toEqual(21.98)
        expect(calculatePrice(PRICING, 'eu-west-1' ,'cr0', 1)).toEqual(5)
        expect(calculatePrice(PRICING, 'ap-southeast-1' ,'cr0', 3)).toEqual(299.97)
    })
})