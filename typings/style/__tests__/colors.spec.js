import uut from "../colors";
describe("services/AvatarService", () => {
    it("should add alpha to hex color value", () => {
        expect(uut.rgba(uut.green30, 0.7)).toBe("rgba(101, 200, 136, 0.7)");
        expect(uut.rgba(uut.red10, 0.7)).toBe("rgba(207, 38, 47, 0.7)");
        expect(uut.rgba(uut.green30, 0.25)).toBe("rgba(101, 200, 136, 0.25)");
        // expect(uut.rgba('#ff2442', 0.05)).toBe(`${'#ff2442'}0D`);
        // expect(uut.rgba(uut.blue20, 1)).toBe(`${uut.blue20}FF`);
        // expect(uut.rgba(uut.blue20)).toBe(`${uut.blue20}FF`);
        // expect(uut.rgba(uut.blue20, 2)).toBe(`${uut.blue20}`);
        // expect(uut.rgba(uut.blue20, -2)).toBe(`${uut.blue20}`);
        // expect(uut.rgba(uut.blue20, '12ddsav')).toBe(`${uut.blue20}`);
    });
    it("should add alpha to rgb color value", () => {
        expect(uut.rgba(101, 200, 136, 0.7)).toBe("rgba(101, 200, 136, 0.7)");
        expect(uut.rgba(207, 38, 47, 0.7)).toBe("rgba(207, 38, 47, 0.7)");
        expect(uut.rgba(101, 200, 136, 0.25)).toBe("rgba(101, 200, 136, 0.25)");
    });
    it("should handle wrong number of params", () => {
        expect(() => uut.rgba(101, 136, 0.7)).toThrow(new Error("rgba can work with either 2 or 4 arguments"));
    });
    it("should handle invalid rgb code", () => {
        expect(() => uut.rgba(-12, 128, 136, 0.7)).toThrow(new Error("-12 is invalid rgb code, please use number between 0-255"));
        expect(() => uut.rgba(12, 128, 256, 0.7)).toThrow(new Error("256 is invalid rgb code, please use number between 0-255"));
    });
    it("should handle invalid hex code", () => {
        expect(() => uut.rgba("#ff22445", 0.7)).toThrow(new Error("#ff22445 is invalid hex color"));
        expect(() => uut.rgba("ff2244", 0.7)).toThrow(new Error("ff2244 is invalid hex color"));
        expect(() => uut.rgba("#ff244", 0.7)).toThrow(new Error("#ff244 is invalid hex color"));
    });
});
