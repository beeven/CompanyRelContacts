var express = require("express"),
    router = express.Router();

var db = require("./database");

router.get("/query/:criteria",function(req,res){
    var criteria = req.params.criteria;
    db.query(criteria).then(function(records){
        res.json({result:"ok", data: records});
    }).catch(function(err){
        res.json({result:"fail", error:err.toString()});
    });
});
router.get("/:pageSize/:currentPage",function(req,res){
    var pageSize = parseInt(req.params.pageSize);
    var currentPage = parseInt(req.params.currentPage);
    if(isNaN(pageSize) || pageSize < 0) {
      pageSize =10;
    }
    if(isNaN(currentPage) || currentPage < 0) {
      currentPage = 0;
    }
    db.browse(pageSize, currentPage).then(function(records){
        res.json({result:"ok", data: {
            total: records[0].TotalRows,
            records: records
        }});
    },function(err){
        res.json({result:"fail", error:err.toString()});
    });
});
router.post("/setMobile",function(req,res){
    var companyId = req.body.companyId;
    var contactMobile = req.body.contactMobile;
    var lawManMobile = req.body.lawManMobile;
    db.setMobile(companyId, contactMobile, lawManMobile).then(function(record){
        res.json({result:"ok", data: record});
    },function(err){
        res.json({result:"fail", error:err.toString()});
    });
});


module.exports = router;
