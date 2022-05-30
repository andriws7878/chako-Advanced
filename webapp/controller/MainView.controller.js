sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onInit() {
            var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
            var oJSONModelCountries = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            var i18nBundle = oView.getModel("i18n").getResourceBundle();
            /*var oJSON = {
                employeeId: "12345",
                countryKey: "UK",
                listCountry: [
                    {
                        key: "US",
                        text: i18nBundle.getText("countryUS")
                    },
                    {
                        key: "UK",
                        text: i18nBundle.getText("countryUK")
                    },
                    {
                        key: "ES",
                        text: i18nBundle.getText("countryES")
                    }
                ]
            };
            oJSONModel.setData(oJSON);*/
            oJSONModelEmpl.loadData("./localService/mockdata/Employees.json", false);
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);
            /*oJSONModel.attachRequestCompleted(function(oEventModel){
                console.log(JSON.stringify(oJSONModel.getData()));
            });*/
            oView.setModel(oJSONModelEmpl, "jsonEmployees");
            oView.setModel(oJSONModelCountries, "jsonCoutries");

            var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });
            oView.setModel(oJSONModelConfig, "jsonConfig");
        };

        function onFilter() {
            var oJSONCountires = this.getView().getModel("jsonCoutries").getData();

            var filters = [];

            if (oJSONCountires.EmployeeId !== "") {
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountires.EmployeeId));
            }

            if (oJSONCountires.CountryKey !== "") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJSONCountires.CountryKey));
            }

            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);
        };

        function onClearFilter() {
            var oModel = this.getView().getModel("jsonCoutries");
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");
        };

        function showPostalCode(oEvent) {
            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext("jsonEmployees");
            var objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);
        };

        function onShowCity(){
            var oJSONModelConfig = this.getView().getModel("jsonConfig");
            oJSONModelConfig.setProperty("/visibleCity", true);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", true);
        };

        function onHideCity(){
            var oJSONModelConfig = this.getView().getModel("jsonConfig");
            oJSONModelConfig.setProperty("/visibleCity", false);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
        };

        function showOrders(oEvent){

            //Get selected controller
            var iconPressed = oEvent.getSource();
            
            //Context from the model
            var oContext = iconPressed.getBindingContext("jsonEmployees");
            if(!this._DialogOrders){
                this._DialogOrders = sap.ui.xmlfragment("chakoapp.employees.fragment.DialogOrders", this);
                this.getView().addDependent(this._DialogOrders);
            };

            //Dialog binding to the Context to have access to the data of select item
            this._DialogOrders.bindElement("jsonEmployees>" + oContext.getPath());
            this._DialogOrders.open();
            

            /*var ordersTable = this.getView().byId("ordersTable");
            ordersTable.destroyItems();

            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext("jsonEmployees");
            var objectContext = oContext.getObject();
            var orders = objectContext.Orders;
            var ordersItems = [];
            
            for(var i in orders){
                ordersItems.push(new sap.m.ColumnListItem({
                    cells : [
                        new sap.m.Label({ text: orders[i].OrderID}),
                        new sap.m.Label({ text: orders[i].Freight}),
                        new sap.m.Label({ text: orders[i].ShipAddress})
                    ]
                }));
            }

            var newTable = new sap.m.Table({
                width: "auto",
                columns: [
                    new sap.m.Column({header : new sap.m.Label({text : "{i18n>orderID}"})}),
                    new sap.m.Column({header : new sap.m.Label({text : "{i18n>freight}"})}),
                    new sap.m.Column({header : new sap.m.Label({text : "{i18n>shipAddress}"})})
                ],
                items: ordersItems
            }).addStyleClass("sapUiSmallMargin");

            ordersTable.addItem(newTable);

            var newTableJSON = new sap.m.Table();
            newTableJSON.setWidth("auto");
            newTableJSON.addStyleClass("sapUiSmallMargin");

            var columOrderID = new sap.m.Column();
            var labelOrderID = new sap.m.Label();
            labelOrderID.bindProperty("text", "i18n>orderID");
            columOrderID.setHeader(labelOrderID);
            newTableJSON.addColumn(columOrderID);

            var columFreight = new sap.m.Column();
            var labelFreight = new sap.m.Label();
            labelFreight.bindProperty("text", "i18n>freight");
            columFreight.setHeader(labelFreight);
            newTableJSON.addColumn(columFreight);

            var columShipAddress = new sap.m.Column();
            var labelShipAddress = new sap.m.Label();
            labelShipAddress.bindProperty("text", "i18n>shipAddress");
            columShipAddress.setHeader(labelShipAddress);
            newTableJSON.addColumn(columShipAddress);

            var columnListItem = new sap.m.ColumnListItem();

            var cellOrderID = new sap.m.Label();
            cellOrderID.bindProperty("text", "jsonEmployees>OrderID");
            columnListItem.addCell(cellOrderID);

            var cellFreight = new sap.m.Label();
            cellFreight.bindProperty("text", "jsonEmployees>Freight");
            columnListItem.addCell(cellFreight);

            var cellShipAddress = new sap.m.Label();
            cellShipAddress.bindProperty("text", "jsonEmployees>ShipAddress");
            columnListItem.addCell(cellShipAddress);

            var oBindingInfo = {
                model: "jsonEmployees",
                path: "Orders",
                template: columnListItem
            };

            newTableJSON.bindAggregation("items", oBindingInfo); 
            newTableJSON.bindElement("jsonEmployees>" + oContext.getPath());
            ordersTable.addItem(newTableJSON);*/
        };

        function onCloseOrders(){
            this._DialogOrders.close();
        }

        var Main = Controller.extend("chakoapp.employees.controller.MainView", {});

        Main.prototype.onValidate = function () {
            var inputEmpleyee = this.byId("inputEmpleyee");
            var valueEmpleyee = inputEmpleyee.getValue();

            if (valueEmpleyee.length === 6) {
                //inputEmpleyee.setDescription("OK");
                this.getView().byId("labelCountry").setVisible(true);
                this.getView().byId("slCountry").setVisible(true);
            } else {
                //inputEmpleyee.setDescription("Not OK");
                this.getView().byId("labelCountry").setVisible(false);
                this.getView().byId("slCountry").setVisible(false);
            };
        };

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.onShowCity = onShowCity;
        Main.prototype.onHideCity = onHideCity;
        Main.prototype.showOrders = showOrders;
        Main.prototype.onCloseOrders = onCloseOrders;
        return Main;
    });