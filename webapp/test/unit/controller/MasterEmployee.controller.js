/*global QUnit*/

sap.ui.define([
	"chakoapp/employees/controller/MasterEmployee.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MasterEmployee Controller");

	QUnit.test("I should test the MasterEmployee controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
