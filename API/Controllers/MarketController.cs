using System;
using System.Threading.Tasks;
using Application.Markets;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

     [Authorize]
     [AllowAnonymous]

    public class MarketController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetMarkets()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetMarket(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


    

    }


}