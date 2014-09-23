using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace vCare.Controllers
{
    public class cpMainController : Controller
    {
        // GET: CareProvider
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Call()
        {
            return View();
        }

        public ActionResult CallParticularDevice(int devid)
        {
            ViewBag.dev = devid;
            return View();
        }

    }
}