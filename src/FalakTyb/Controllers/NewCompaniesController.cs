
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
   
    [Route("api/new-companies")]
    [ApiController]
    public class NewCompaniesController : ControllerBase
    {
        private const string EntityName = "newCompany";
        private readonly ILogger<NewCompaniesController> _log;
        private readonly IMediator _mediator;

        public NewCompaniesController(ILogger<NewCompaniesController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

   [HttpPost("mobile/add")]
        [ValidateModel]
        public async Task<ActionResult<NewCompany>> CreateNewCompanyForMoble([FromBody] NewCompany newCompany)
        {
            _log.LogDebug($"REST request to save NewCompany : {newCompany}");
            if (newCompany.Id != 0)
                throw new BadRequestAlertException("A new newCompany cannot already have an ID", EntityName, "idexists");
            newCompany = await _mediator.Send(new NewCompanyCreateCommand { NewCompany = newCompany });
            return CreatedAtAction(nameof(GetNewCompany), new { id = newCompany.Id }, newCompany)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, newCompany.Id.ToString()));
        }




        [Authorize]
        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<NewCompany>> CreateNewCompany([FromBody] NewCompany newCompany)
        {
            _log.LogDebug($"REST request to save NewCompany : {newCompany}");
            if (newCompany.Id != 0)
                throw new BadRequestAlertException("A new newCompany cannot already have an ID", EntityName, "idexists");
            newCompany = await _mediator.Send(new NewCompanyCreateCommand { NewCompany = newCompany });
            return CreatedAtAction(nameof(GetNewCompany), new { id = newCompany.Id }, newCompany)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, newCompany.Id.ToString()));
        }
         [Authorize]
        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateNewCompany(long id, [FromBody] NewCompany newCompany)
        {
            _log.LogDebug($"REST request to update NewCompany : {newCompany}");
            if (newCompany.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != newCompany.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            newCompany = await _mediator.Send(new NewCompanyUpdateCommand { NewCompany = newCompany });
            return Ok(newCompany)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, newCompany.Id.ToString()));
        }
        [Authorize] 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewCompany>>> GetAllNewCompanies(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of NewCompanies");
            var result = await _mediator.Send(new NewCompanyGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewCompany([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get NewCompany : {id}");
            var result = await _mediator.Send(new NewCompanyGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }
          [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNewCompany([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete NewCompany : {id}");
            await _mediator.Send(new NewCompanyDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
