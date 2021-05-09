using HajosTeszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {

        /*[HttpGet]
        [Route("questions/count")]
        public int M1()
        {
            hajostesztContext context = new hajostesztContext();
            int kérdésekSzáma = context.Questions.Count();
            //itt from x-es írásmód is jó, ez egy linq
            return kérdésekSzáma;
        }*/

    }
}
