
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
    [Route("api/offers-categories")]
    [ApiController]
    public class OffersCategoriesController : ControllerBase
    {
        private const string EntityName = "offersCategories";
        private readonly ILogger<OffersCategoriesController> _log;
        private readonly IMediator _mediator;

        public OffersCategoriesController(ILogger<OffersCategoriesController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<OffersCategories>> CreateOffersCategories([FromBody] OffersCategories offersCategories)
        {
            _log.LogDebug($"REST request to save OffersCategories : {offersCategories}");
            if (offersCategories.Id != 0)
                throw new BadRequestAlertException("A new offersCategories cannot already have an ID", EntityName, "idexists");
            offersCategories = await _mediator.Send(new OffersCategoriesCreateCommand { OffersCategories = offersCategories });
            return CreatedAtAction(nameof(GetOffersCategories), new { id = offersCategories.Id }, offersCategories)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, offersCategories.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateOffersCategories(long id, [FromBody] OffersCategories offersCategories)
        {
            _log.LogDebug($"REST request to update OffersCategories : {offersCategories}");
            if (offersCategories.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != offersCategories.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            offersCategories = await _mediator.Send(new OffersCategoriesUpdateCommand { OffersCategories = offersCategories });
            return Ok(offersCategories)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, offersCategories.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OffersCategories>>> GetAllOffersCategories(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of OffersCategories");
            var result = await _mediator.Send(new OffersCategoriesGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }


//get all offers categories by offer provider id and offer
 [HttpGet("/get/all/employee/mobile/{offerProviderId}")]
        public async Task<ActionResult<IEnumerable<CategoriesWithListOffers>>> GetAllOffersCategoriesByOfferProviderIdAndOffer(long offerProviderId, IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of OffersCategories");
            var result = await _mediator.Send(new OffersCategoriesGetAllByOfferProviderIdQuery { OfferProviderId = offerProviderId, Page = pageable });
            return Ok(result);
        }








        [HttpGet("{id}")]
        public async Task<IActionResult> GetOffersCategories([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get OffersCategories : {id}");
            var result = await _mediator.Send(new OffersCategoriesGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }











        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOffersCategories([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete OffersCategories : {id}");
            await _mediator.Send(new OffersCategoriesDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
