using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class SubProvidersDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
