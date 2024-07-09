
using MediatR;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using awqaf.Domain;
using awqaf.Crosscutting.Exceptions;
using awqaf.Web.Extensions;
using awqaf.Web.Filters;
using awqaf.Web.Rest.Utilities;
using awqaf.Application.Queries;
using awqaf.Application.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace awqaf.Controllers
{
    [Authorize]
    [Route("api/redeems")]
    [ApiController]
    public class RedeemsController : ControllerBase
    {
        private const string EntityName = "redeem";
        private readonly ILogger<RedeemsController> _log;
        private readonly IMediator _mediator;

        public RedeemsController(ILogger<RedeemsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Redeem>> CreateRedeem([FromBody] Redeem redeem)
        {



            _log.LogDebug($"REST request to save Redeem : {redeem}");
            if (redeem.Id != 0)
                throw new BadRequestAlertException("A new redeem cannot already have an ID", EntityName, "idexists");
            redeem = await _mediator.Send(new RedeemCreateCommand { Redeem = redeem });
            return CreatedAtAction(nameof(GetRedeem), new { id = redeem.Id }, redeem)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, redeem.Id.ToString()));
        }


        //logic to check the redeem code match with provder code and save it 

        [HttpPost("redeem/checkpoint")]
        [ValidateModel]
        public async Task<ActionResult<string>> CreateRedeemLogic([FromBody] Redeem redeem)
        {


            string isValid = "false";
            if (redeem.ProviderId != 0)
            {
                var result = await _mediator.Send(new ProvidersGetQuery { Id = redeem.ProviderId });

                if (result.ProviderCode.Equals(redeem.Code))
                {
                    _log.LogDebug($"REST request to save Redeem : {redeem}");
                    if (redeem.Id != 0)
                        throw new BadRequestAlertException("A new redeem cannot already have an ID", EntityName, "idexists");
                    redeem = await _mediator.Send(new RedeemCreateCommand { Redeem = redeem });
                    isValid = "true";

                }


            }




            if (redeem.OfferId != 0)
            {
                var resultoffer = await _mediator.Send(new OffersGetQuery { Id = redeem.OfferId });

                if (resultoffer.OfferCode.Equals(redeem.Code))
                {
                    _log.LogDebug($"REST request to save Redeem : {redeem}");
                    if (redeem.Id != 0)
                        throw new BadRequestAlertException("A new redeem cannot already have an ID", EntityName, "idexists");
                    redeem = await _mediator.Send(new RedeemCreateCommand { Redeem = redeem });
                    isValid = "true";

                }


            }






            return isValid;


        }





        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateRedeem(long id, [FromBody] Redeem redeem)
        {
            _log.LogDebug($"REST request to update Redeem : {redeem}");
            if (redeem.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != redeem.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            redeem = await _mediator.Send(new RedeemUpdateCommand { Redeem = redeem });
            return Ok(redeem)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, redeem.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Redeem>>> GetAllRedeems(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Redeems");
            var result = await _mediator.Send(new RedeemGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }



        [HttpGet("most-Redeem")]
        public async Task<ActionResult<IEnumerable<MostRedeem>>> GetAllMostRedeems(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Redeems");
            var result = await _mediator.Send(new MostRedeemsGetAllQuery { Page = pageable });
            return Ok(result);
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetRedeem([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Redeem : {id}");
            var result = await _mediator.Send(new RedeemGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRedeem([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Redeem : {id}");
            await _mediator.Send(new RedeemDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
