
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
    [Route("api/frequently-asked-questions")]
    [ApiController]
    public class FrequentlyAskedQuestionsController : ControllerBase
    {
        private const string EntityName = "frequentlyAskedQuestions";
        private readonly ILogger<FrequentlyAskedQuestionsController> _log;
        private readonly IMediator _mediator;

        public FrequentlyAskedQuestionsController(ILogger<FrequentlyAskedQuestionsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<FrequentlyAskedQuestions>> CreateFrequentlyAskedQuestions([FromBody] FrequentlyAskedQuestions frequentlyAskedQuestions)
        {
            _log.LogDebug($"REST request to save FrequentlyAskedQuestions : {frequentlyAskedQuestions}");
            if (frequentlyAskedQuestions.Id != 0)
                throw new BadRequestAlertException("A new frequentlyAskedQuestions cannot already have an ID", EntityName, "idexists");
            frequentlyAskedQuestions = await _mediator.Send(new FrequentlyAskedQuestionsCreateCommand { FrequentlyAskedQuestions = frequentlyAskedQuestions });
            return CreatedAtAction(nameof(GetFrequentlyAskedQuestions), new { id = frequentlyAskedQuestions.Id }, frequentlyAskedQuestions)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, frequentlyAskedQuestions.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateFrequentlyAskedQuestions(long id, [FromBody] FrequentlyAskedQuestions frequentlyAskedQuestions)
        {
            _log.LogDebug($"REST request to update FrequentlyAskedQuestions : {frequentlyAskedQuestions}");
            if (frequentlyAskedQuestions.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != frequentlyAskedQuestions.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            frequentlyAskedQuestions = await _mediator.Send(new FrequentlyAskedQuestionsUpdateCommand { FrequentlyAskedQuestions = frequentlyAskedQuestions });
            return Ok(frequentlyAskedQuestions)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, frequentlyAskedQuestions.Id.ToString()));
        }





        

        [HttpGet("Search/{words}")]
        public async Task<ActionResult<IEnumerable<FrequentlyAskedQuestions>>> SearchFrequentlyAskedQuestionsByWords(string words, IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of FrequentlyAskedQuestions");
            var result = await _mediator.Send(new SearchFrequentlyAskedQuestionsByWordsQuery { Words = words });
            return Ok(result);
        }


   [HttpGet]
        public async Task<ActionResult<IEnumerable<FrequentlyAskedQuestions>>> GetAllFrequentlyAskedQuestions(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of FrequentlyAskedQuestions");
            var result = await _mediator.Send(new FrequentlyAskedQuestionsGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetFrequentlyAskedQuestions([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get FrequentlyAskedQuestions : {id}");
            var result = await _mediator.Send(new FrequentlyAskedQuestionsGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFrequentlyAskedQuestions([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete FrequentlyAskedQuestions : {id}");
            await _mediator.Send(new FrequentlyAskedQuestionsDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
