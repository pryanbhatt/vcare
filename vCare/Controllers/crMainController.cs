using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace vCare.Controllers
{
    public class crMainController : Controller
    {
        // GET: CareRecepient
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CalledDevice(int devid)
        {
            ViewBag.dev = devid;
            return View();
        }

    }
}