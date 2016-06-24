export class InMemoryDataService {
  createDb() {
    let accounts = [
      {id:1, "userId" : "568202a1b8732c7056adb100", "email" : "tony0320675@sina.com", "mobile" : "13500030201", "companyId" : "4401986999", "companyName" : "广州市海通科技服务公司" },
      {id:2, "userId" : "5684b5450376acb33f97616b", "email" : "liminlei@customs.gov.cn", "mobile" : "13600005150", "companyId" : "4430985002", "companyName" : "广州市广联报关有限公司" },
      {id:3, "userId" : "568dd3132e10a32e14a4b6b9", "email" : "gzrunshun@126.com", "mobile" : "13570706082", "companyId" : "4423985022", "companyName" : "广州润顺国际货运代理有限公司" },
      {id:4, "userId" : "568e088ccfca9d857c0a32cb", "email" : "1787689804@qq.com", "mobile" : "13570706082", "companyId" : "443098504S", "companyName" : "广州连腾报关代理服务有限公司" },
      {id:5, "userId" : "569301db167e74ea039af1fb", "email" : "gzhuanzhan@126.com", "mobile" : "13570706082", "companyId" : "443096143D", "companyName" : "广州森晓贸易有限公司" },
      {id:6, "userId" : "569c4d7047aa39202767b4ce", "email" : "snikelin@163.com", "mobile" : "13535454651", "companyId" : "4401280056", "companyName" : "广州市联港物流有限公司" },
      {id:7, "userId" : "56ef919f6a69c1e60316a8c1", "email" : "zengpan513420@163.com", "mobile" : "13751855344", "companyId" : "4423985030", "companyName" : "广州市信诚物流有限公司南沙分公司" },
      {id:8, "userId" : "56f3abc570add4592dbf3c47", "email" : "elvy@nbclogistics.com.cn", "mobile" : "13543424962", "companyId" : "443066K501", "companyName" : "广州保畅国际物流有限公司" },
      {id:9, "userId" : "56f89ed5df6e23ec0357ddd7", "email" : "657071756@qq.com", "mobile" : "13760740057", "companyId" : "4430985001", "companyName" : "广州市海迅报关服务有限公司" },
      {id:10, "userId" : "56fb9de18d4d127c05ed800c", "email" : "14701602@qq.com", "mobile" : "13697416300", "companyId" : "4401983050", "companyName" : "威时沛运货运(广州)有限公司" }
    ];
    return {accounts};
  }
}
