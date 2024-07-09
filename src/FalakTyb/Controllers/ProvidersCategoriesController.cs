
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
    [Route("api/providers-categories")]
    [ApiController]
    public class ProvidersCategoriesController : ControllerBase
    {
        private const string EntityName = "providersCategories";
        private readonly ILogger<ProvidersCategoriesController> _log;
        private readonly IMediator _mediator;

        public ProvidersCategoriesController(ILogger<ProvidersCategoriesController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<ProvidersCategories>> CreateProvidersCategories([FromBody] ProvidersCategories providersCategories)
        {
            _log.LogDebug($"REST request to save ProvidersCategories : {providersCategories}");
            if (providersCategories.Id != 0)
                throw new BadRequestAlertException("A new providersCategories cannot already have an ID", EntityName, "idexists");
            providersCategories = await _mediator.Send(new ProvidersCategoriesCreateCommand { ProvidersCategories = providersCategories });
            return CreatedAtAction(nameof(GetProvidersCategories), new { id = providersCategories.Id }, providersCategories)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, providersCategories.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateProvidersCategories(long id, [FromBody] ProvidersCategories providersCategories)
        {
            _log.LogDebug($"REST request to update ProvidersCategories : {providersCategories}");
            if (providersCategories.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != providersCategories.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            providersCategories = await _mediator.Send(new ProvidersCategoriesUpdateCommand { ProvidersCategories = providersCategories });
            return Ok(providersCategories)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, providersCategories.Id.ToString()));
        }





        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProvidersCategories>>> GetAllProvidersCategories(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of ProvidersCategories");
            var result = await _mediator.Send(new ProvidersCategoriesGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }


     [HttpGet("mobile/emplyees")]
        public async Task<ActionResult<IEnumerable<ProvidersCategoriesWithCountResponse>>> GetAllProvidersCategoriesWithProvidersNumbers(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of ProvidersCategories");
            var result = await _mediator.Send(new ProvidersCategoriesGetAllwithCountQuery { Page = pageable });
            return Ok(result);
        }









        [HttpGet("{id}")]
        public async Task<IActionResult> GetProvidersCategories([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get ProvidersCategories : {id}");
            var result = await _mediator.Send(new ProvidersCategoriesGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProvidersCategories([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete ProvidersCategories : {id}");
            await _mediator.Send(new ProvidersCategoriesDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
