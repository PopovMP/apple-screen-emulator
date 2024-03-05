import {equal}        from "assert";
import {describe, it} from "node:test";

import {ScreenBuffer} from "../src/screen-buffer.mjs";

describe("ScreenBuffer Tests", () => {
    it ("Instantiates and sets cursor", () => {
        const screenBuffer = new ScreenBuffer();
        const cursor = screenBuffer.getCursorPosition();
        equal(cursor, 0, "Cursor must be set at the first position");
    });

    it("getCharacter gets character at index", () => {
        const screenBuffer = new ScreenBuffer();
        const cursor = screenBuffer.getCursorPosition();
        equal(cursor, 0, "Cursor must be set at the first position");

        screenBuffer.print("A");
        equal(screenBuffer.getCharacter(0), "A", "'A' must be the first character");
        equal(screenBuffer.getCursorPosition(), 1, "The cursor must be the second character");
    });

    it("print adds a character to the ##screenBuffer", () => {
        const screenBuffer = new ScreenBuffer();
        screenBuffer.print("A");
        equal(screenBuffer.getCharacter(0), "A", "'A' must be the first character");
        equal(screenBuffer.getCursorPosition(), 1, "The cursor must be the second character");
    });

    it("clear the buffer", () => {
        const screenBuffer = new ScreenBuffer();
        screenBuffer.print("A");
        screenBuffer.print("B");
        screenBuffer.clear();

        equal(screenBuffer.getCursorPosition(), 0, "The cursor must be the first character");
    });

    it("\r move the cursor on a new line", () => {
        const screenBuffer = new ScreenBuffer();
        screenBuffer.print("A");
        screenBuffer.print("B");
        screenBuffer.print("\r");
        equal(screenBuffer.getCharacter(0), "A", "'A' must be the first character");
        equal(screenBuffer.getCharacter(1), "B", "'B' must be the second character");
        equal(screenBuffer.getCursorPosition(), 40, "The cursor must be the first character on the second line");
    });

    it("#scrollBuffer if last line is reached", () => {
        const screenBuffer = new ScreenBuffer();
        screenBuffer.print("A");
        screenBuffer.print("\r");
        screenBuffer.print("B");
        screenBuffer.print("\r");
        for (let i = 0; i < 22; i += 1) {
            screenBuffer.print("C");
            screenBuffer.print("\r");
        }

        equal(screenBuffer.getCharacter(0), "B", "'B' must be the first character");
        equal(screenBuffer.getCharacter(40), "C", "'C' must be the first character on the second line");
        equal(screenBuffer.getCursorPosition(), 40*23, "The cursor must be the first character on the last line");
    });
});
