"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const By = webdriver.By;


let browser;

test.describe("index", function () {

    this.timeout(20000);

    beforeEach(function (done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();
        browser.get("http://localhost:3000");
        done();

    });

    afterEach(function (done) {
        browser.quit();
        done();
    });

    // Test case
    test.it("Test index", function (done) {
        // Check correct title
        browser.getTitle().then(function (title) {
            assert.equal(title, "React App");
        });

        // // Check correct heading
        browser.findElement(By.css("h1")).then(function (element) {
            element.getText().then(function (text) {
                assert.equal(text, "Trading");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function (url) {
            assert.ok(url.endsWith(""));
        });

        done();
    });



    test.it("Test go to registrera", function (done) {
        // Use nav link to go to login page
        browser.findElement(By.linkText("LOGGA IN")).then(function (element) {
            element.click();
        });
        // Check correct heading
        browser.findElement(By.css("h2")).then(function (element) {
            element.getText().then(function (text) {
                assert.equal(text, "Inloggning");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function (url) {
            assert.ok(url.endsWith("login"));
        });

        // Use nav link to go to login page
        browser.findElement(By.linkText("REGISTRERA")).then(function (element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h2")).then(function (element) {
            element.getText().then(function (text) {
                assert.equal(text, "Registreringsformulär");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function (url) {
            assert.ok(url.endsWith("register"));
        });

        done();
    });

    test.it("Test go to Login", function (done) {
        // Use nav link to go to login page
        browser.findElement(By.linkText("LOGGA IN")).then(function (element) {
            element.click();
        });
        // Check correct heading
        browser.findElement(By.css("h2")).then(function (element) {
            element.getText().then(function (text) {
                assert.equal(text, "Inloggning");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function (url) {
            assert.ok(url.endsWith("login"));
        });

        done();
    });

    test.it("Test go to Depot redirect", function (done) {
        // Use nav link to go to login page
        browser.findElement(By.linkText("DEPOT")).then(function (element) {
            element.click();
        });
        // Check correct heading
        browser.findElement(By.css("h2")).then(function (element) {
            element.getText().then(function (text) {
                assert.equal(text, "Inloggning");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function (url) {
            assert.ok(url.endsWith("login/"));
        });

        done();
    });

    test.it("Test go logga ut but see login", function (done) {
        // Use nav link to go to login page
        browser.findElement(By.linkText("LOGGA UT")).then(function (element) {
            element.click();
        });
        // Check correct heading
        browser.findElement(By.css("h2")).then(function (element) {
            element.getText().then(function (text) {
                assert.equal(text, "Inloggning");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function (url) {
            assert.ok(url.endsWith("login"));
        });

        done();
    });
});