
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
    [Route("api/complaints")]
    [ApiController]
    public class ComplaintsController : ControllerBase
    {
        private const string EntityName = "complaint";
        private readonly ILogger<ComplaintsController> _log;
        private readonly IMediator _mediator;

        public ComplaintsController(ILogger<ComplaintsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Complaint>> CreateComplaint([FromBody] Complaint complaint)
        {
            _log.LogDebug($"REST request to save Complaint : {complaint}");
            if (complaint.Id != 0)
                throw new BadRequestAlertException("A new complaint cannot already have an ID", EntityName, "idexists");
            complaint = await _mediator.Send(new ComplaintCreateCommand { Complaint = complaint });
            return CreatedAtAction(nameof(GetComplaint), new { id = complaint.Id }, complaint)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, complaint.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateComplaint(long id, [FromBody] Complaint complaint)
        {
            _log.LogDebug($"REST request to update Complaint : {complaint}");
            if (complaint.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != complaint.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            complaint = await _mediator.Send(new ComplaintUpdateCommand { Complaint = complaint });
            return Ok(complaint)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, complaint.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Complaint>>> GetAllComplaints(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Complaints");
            var result = await _mediator.Send(new ComplaintGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComplaint([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Complaint : {id}");
            var result = await _mediator.Send(new ComplaintGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComplaint([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Complaint : {id}");
            await _mediator.Send(new ComplaintDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
