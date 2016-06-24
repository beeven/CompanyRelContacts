var Promise = require("bluebird"),
    sql = require("mssql");

var config = require("./config");

class Database {
    constructor() {
    }
    browse(pageSize, currentPage) {
        return Promise.coroutine(function*(){
            var connection = new sql.Connection(config.database.url);
            yield connection.connect();
            var request = new sql.Request(connection);
            var recordset = yield request.query(`
                with CTE as
                (
                   select TRADE_CO, FULL_NAME,COP_GB_CODE,SOCIAL_CREDIT_CODE, CONTAC_CO,CONTACT_MOBILE, LAW_MAN, LAW_MAN_MOBILE, ROW_NUMBER() OVER (ORDER BY TRADE_CO) as RowNum
                   from dbo.COMPANY_REL_VIEW
                   where CUSTOMS_CODE like '51%'
                )
                select *,(select MAX(RowNum) from CTE) as 'TotalRows' from CTE
                where RowNum BETWEEN ${pageSize*currentPage +1 } AND ${pageSize*(currentPage+1)} ;
                `);
            return Promise.resolve(recordset);
            connection.close();
        })();
    }
    query(criteria) {
        return Promise.coroutine(function*(){
            var connection = new sql.Connection(config.database.url);
            yield connection.connect();
            var request = new sql.Request(connection);
            request.input("criteria",criteria);
            var recordset = yield request.query(`
                   select TRADE_CO, FULL_NAME,COP_GB_CODE,SOCIAL_CREDIT_CODE, CONTAC_CO,CONTACT_MOBILE, LAW_MAN, LAW_MAN_MOBILE, ROW_NUMBER() OVER (ORDER BY TRADE_CO) as RowNum
                   from dbo.COMPANY_REL_VIEW
                   where CUSTOMS_CODE like '51%'
                       and (
                               TRADE_CO like '%'+@criteria+'%'
                            or FULL_NAME like '%'+@criteria+'%'
                            or SOCIAL_CREDIT_CODE like '%'+@criteria+'%'
                            or CONTACT_MOBILE like '%'+@criteria+'%'
                            or LAW_MAN_MOBILE like '%'+@criteria+'%'
                           )
                `);
            return Promise.resolve(recordset);
            connection.close();
        })();
    }
    setMobile(companyId, contactMobile, lawManMobile) {
        return Promise.coroutine(function*(){
            var connection = new sql.Connection(config.database.url);
            yield connection.connect();
            var transaction = new sql.Transaction(connection);
            yield transaction.begin();
            var request = new sql.Request(transaction);
            request.input("companyId",companyId);
            request.input("contactMobile",contactMobile);
            request.input("lawManMobile",lawManMobile);
            var recordset = yield request.query(`
                SET NOCOUNT ON;
                MERGE dbo.COMPANY_CONTACT_MOBILE AS target
                USING( select @companyId,@contactMobile,@lawManMobile ) AS source (CompanyId, ContactMobile, LawManMobile)
                ON (target.TRADE_CO = source.CompanyId)
                WHEN MATCHED THEN
                    UPDATE SET CONTACT_MOBILE = source.ContactMobile, LAW_MAN_MOBILE = source.LawManMobile
                WHEN NOT MATCHED THEN
                    INSERT (TRADE_CO, CONTACT_MOBILE, LAW_MAN_MOBILE)
                    VALUES (source.CompanyId, source.ContactMobile, source.LawManMobile);
                SET NOCOUNT OFF;
                SELECT TOP 1 * FROM dbo.COMPANY_REL_VIEW where TRADE_CO=@companyId;
                `);
            yield transaction.commit();
            if(recordset.length == 0) {
                return Promise.resolve(null);
            }
            return Promise.resolve(recordset[0]);
            connection.close();
        })();

    }
    getCompanyInfo(companyId){
        return Promise.coroutine(function*(){
            var connection = new sql.Connection(config.database.url);
            yield connection.connect();
            var request = new sql.Request(connection);
            request.input("companyId",companyId);
            var recordset = yield request.query("select top 1 * from dbo.COMPANY_REL_VIEW where TRADE_CO = @companyId");
            if(recordset.length == 0) {
                return Promise.resolve(null);
            }
            return Promise.resolve(recordset[0]);
            connection.close();
        })();
    }
}


module.exports = new Database();
