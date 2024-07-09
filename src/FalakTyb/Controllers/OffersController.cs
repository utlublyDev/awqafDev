
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
    [Route("api/offers")]
    [ApiController]
    public class OffersController : ControllerBase
    {
        private const string EntityName = "offers";
        private readonly ILogger<OffersController> _log;
        private readonly IMediator _mediator;

        public OffersController(ILogger<OffersController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Offers>> CreateOffers([FromBody] Offers offers)
        {
            if(offers.IsWebsiteOrApp==false){
            var result = await _mediator.Send(new ProvidersGetQuery { Id = long.Parse(offers.ProviderId) });

            offers.OfferCode = result.ProviderCode;
            }
            _log.LogDebug($"REST request to save Offers : {offers}");
            if (offers.Id != 0)
               

                throw new BadRequestAlertException("A new offers cannot already have an ID", EntityName, "idexists");
            offers = await _mediator.Send(new OffersCreateCommand { Offers = offers });
            return CreatedAtAction(nameof(GetOffers), new { id = offers.Id }, offers)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, offers.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateOffers(long id, [FromBody] Offers offers)
        {
              var result = await _mediator.Send(new ProvidersGetQuery { Id = long.Parse(offers.ProviderId) });
            offers.OfferCode = result.ProviderCode;
            _log.LogDebug($"REST request to update Offers : {offers}");
            if (offers.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != offers.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            offers = await _mediator.Send(new OffersUpdateCommand { Offers = offers });
            return Ok(offers)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, offers.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Offers>>> GetAllOffers(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Offers");
            var result = await _mediator.Send(new OffersGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }


//get offer by provider id 
 [HttpGet("get/all/employee/mobile/offers/{providerId}")]
        public async Task<ActionResult<IEnumerable<Providers>>> GetAllOffersByProviderId(string providerId ,IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of SavedProviders");
            var result = await _mediator.Send(new OffersGetAllOffersByProviderIdQuery { ProviderId=providerId  });
            return Ok(result);
        }



//get offer by category id
 [HttpGet("get/all/employee/mobile/offers/Category/{CategoryId}/{providerId}")]
        public async Task<ActionResult<IEnumerable<Providers>>> GetAllOffersByCategoryId(long CategoryId ,long providerId,   IPageable pageable)
        {
            _log.LogDebug("REST request to  get offer by category id");
            var result = await _mediator.Send(new OffersGetAllOffersByCategoryIdQuery {CategoryId=CategoryId,ProviderId=providerId  });
            return Ok(result);
        }


//SearchOffersByName
 [HttpGet("search/employee/mobile/offers/{words}")]
        public async Task<ActionResult<IEnumerable<Offers>>> SearchOffersByName(string words ,IPageable pageable)
        {
            _log.LogDebug("REST request to  get offer by category id");
            var result = await _mediator.Send(new SearchOffersByNameQuery {Words=words});
            return Ok(result);
        }









//SearchOffersByName
 [HttpGet("search/employee/mobile/offers/range/{minInput}/{maxInput}")]
        public async Task<ActionResult<IEnumerable<Offers>>> SearchOffersRange(int minInput ,int maxInput, IPageable pageable)
        {
            _log.LogDebug("REST request to  get offer by category id");
            var result = await _mediator.Send(new SearchOffersRangeQuery {MinInput=minInput,MaxInput=maxInput});
            return Ok(result);
        }













        [HttpGet("{id}")]
        public async Task<IActionResult> GetOffers([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Offers : {id}");
            var result = await _mediator.Send(new OffersGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOffers([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Offers : {id}");
            await _mediator.Send(new OffersDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
