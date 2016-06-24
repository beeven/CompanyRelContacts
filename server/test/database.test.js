var should = require("should");

var sql = require("mssql"),
    config = require("../config");

describe("Databse",function(){
    var db = require("../database");

    describe("#browse",function(){
        it("should return a promise of an array of records",function(){
            return db.browse(10,10).should.be.finally.an.Array()
                    .with.lengthOf(10)
                    .matchEach((item)=>{
                        item.should.have.properties(["TRADE_CO","FULL_NAME","CONTACT_MOBILE"]);
                    });
        });
    });

    describe("#query", function(){
        it("should return an array of records containing only one item if the criteria is a companyId",function(){
            return db.query("4401986999").should.be.finally.an.Array()
                    .with.lengthOf(1)
                    .matchEach((item)=>{
                        item.should.have.properties(["TRADE_CO","FULL_NAME","CONTACT_MOBILE"])
                            .and.property("TRADE_CO").eql("4401986999");

                    });
        });
        it("should return an array of records containing criteria in the FULL_NAME",function(){
            return db.query("海通").should.be.finally.an.Array()
                    .matchEach((item)=>{
                        item.should.have.property("FULL_NAME").which.match(/海通/);
                    });
        });
    });

    describe("#getCompanyInfo",function(){
        it("should return the info of an company",function(){
            return db.getCompanyInfo("4401986999").should.be.finally.an.Object()
                     .of.which.the.property("TRADE_CO").eql("4401986999");

        });
        it("should return null object if not found",function(){
            return db.getCompanyInfo("4401986996").should.be.finally.null();
        });
    });

    describe("#setMobile",function(){
        before(function(done){
            sql.connect(config.database.url).then(function(){
                var request = new sql.Request();
                request.query(`
                    delete from dbo.COMPANY_CONTACT_MOBILE where TRADE_CO = '4401986999' or TRADE_CO='4401986998'; 
                    insert into dbo.COMPANY_CONTACT_MOBILE (TRADE_CO,CONTACT_MOBILE) values ('4401986999','12345678901')
                    `).then(function(){
                        done();
                    });
            });
        });
        it("should set contact_mobile and law_man_mobile according to companyId, and return the new company info",function(){
            return db.setMobile("4401986999","10987654321").should.be.finally.an.Object()
                .with.property("CONTACT_MOBILE").eql("10987654321");

        });
        it("should add new record if the company doesn't have a contact mobile",function(){
            return db.setMobile("4401986998","12345678901").should.be.finally.an.Object()
                .with.property("CONTACT_MOBILE").eql("12345678901");
        });
        it("should return null if the company doesn't exist",function(){
            return db.setMobile("4401986996","12345678901").should.be.finally.null();
        });
    });
    
});
